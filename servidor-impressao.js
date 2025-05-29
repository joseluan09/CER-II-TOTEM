const express = require('express');
const escpos = require('escpos');

// Ativa suporte USB
escpos.USB = require('escpos-usb');

const app = express();
app.use(express.json());

app.post('/imprimir', (req, res) => {
  const { texto, tipo } = req.body;

  try {
    const device = new escpos.USB();
    const printer = new escpos.Printer(device);

    device.open((error) => {
      if (error) {
        console.error('Erro ao abrir dispositivo:', error);
        return res.status(500).send({ erro: 'Erro ao abrir a impressora' });
      }

      const agora = new Date();
      const dataFormatada = agora.toLocaleDateString('pt-BR');
      const horaFormatada = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      printer
        .align('CT')
        .style('B')
        .size(1, 1)
        .text('PREFEITURA MUNICIPAL DE AREIA BRANCA')
        .text('SENHA DE ATENDIMENTO')
        .feed(1)
        .style('B')
        .size(3, 3)
        .text(texto) // Ex: "P - 018"
        .feed(1)
        .size(1, 1)
        .text(tipo === 'P' ? 'Preferencial' : 'Normal')
        .feed(1)
        .style('NORMAL')
        .text(`Emitido em: ${dataFormatada} ${horaFormatada}`)
        .text('Aguarde ser chamado')
        .feed(3)
        .cut()
        .close();

      res.status(200).send({ sucesso: true });
    });
  } catch (erro) {
    console.error('Erro geral:', erro);
    res.status(500).send({ erro: 'Erro interno no servidor de impressão' });
  }
});

app.listen(5001, () => {
  console.log('🖨️  Servidor de impressão rodando em http://localhost:5001');
});
