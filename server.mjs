import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'url';

let filaN = [];
let filaP = [];
let filaSenhas = [];
let senhaAtual = null;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;
const filaPath = join(__dirname, 'fila.json');

async function salvarFila() {
    const dados = {
        filaN,
        filaP,
        filaSenhas,
        senhaAtual
    };
    await writeFile(filaPath, JSON.stringify(dados, null, 2), 'utf-8');
}

async function carregarFila() {
    try {
        const conteudo = await readFile(filaPath, 'utf-8');
        const dados = JSON.parse(conteudo);
        filaN = dados.filaN || [];
        filaP = dados.filaP || [];
        filaSenhas = dados.filaSenhas || [];
        senhaAtual = dados.senhaAtual || null;
        console.log('Fila carregada do arquivo.');
    } catch {
        console.log('Arquivo fila.json não encontrado. Iniciando com filas vazias.');
        filaN = [];
        filaP = [];
        filaSenhas = [];
        senhaAtual = null;
    }
}

const server = createServer(async (req, res) => {
    const url = req.url;
    const method = req.method;

    // === ROTAS DE API ===

    if (url === '/api/senha' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            const { tipo } = JSON.parse(body);
            const fila = tipo === 'P' ? filaP : filaN;
            const novaSenha = tipo + String(fila.length + 1).padStart(3, '0');
            fila.push(novaSenha);
            filaSenhas.push(novaSenha);
            await salvarFila();

            console.log(`Nova senha ${tipo}: ${novaSenha}`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ senha: novaSenha }));
        });
        return;
    }

    if (url === '/api/proxima' && method === 'GET') {
        senhaAtual = filaSenhas.shift() || null;
        await salvarFila();

        console.log(`Senha chamada: ${senhaAtual}`);
        await writeFile(join(__dirname, 'senha_atual.txt'), senhaAtual || '', 'utf-8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ senha: senhaAtual }));
        return;
    }

    if (url === '/api/atual' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ senha: senhaAtual }));
        return;
    }

    // === ROTAS ESTÁTICAS ===

    let filePath = url === '/' ? '/cliente.html' : url;
    let ext = extname(filePath);

    try {
        const content = await readFile(join(__dirname, 'public', filePath));
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(content);
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada.');
    }
});

// Inicialização do servidor com carregamento da fila
async function main() {
    await carregarFila();
    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

main();
