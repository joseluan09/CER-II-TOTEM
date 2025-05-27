import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const publicDir = join(__dirname, 'public');

const server = createServer((req, res) => {
  let route = req.url;

  let fileMap = {
    '/': 'cliente.html',          // pode mudar pra qualquer um como padrão
    '/cliente': 'cliente.html',
    '/atendente': 'atendente.html',
    '/publico': 'publico.html'
  };

  const fileName = fileMap[route];

  if (fileName) {
    const filePath = join(publicDir, fileName);
    readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro interno');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://127.0.0.1:3000');
});
