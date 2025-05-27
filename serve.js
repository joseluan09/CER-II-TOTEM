const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let normalCounter = 0;
let preferentialCounter = 0;
let currentPassword = null;

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  // Envia o estado atual para o novo cliente
  ws.send(JSON.stringify({ type: 'update', currentPassword }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'newPassword') {
      if (data.category === 'normal') {
        normalCounter++;
        currentPassword = `N${normalCounter.toString().padStart(3, '0')}`;
      } else if (data.category === 'preferential') {
        preferentialCounter++;
        currentPassword = `P${preferentialCounter.toString().padStart(3, '0')}`;
      }
      // Envia a senha atualizada para todos os clientes
      broadcast({ type: 'update', currentPassword });
    } else if (data.type === 'reset') {
      normalCounter = 0;
      preferentialCounter = 0;
      currentPassword = null;
      broadcast({ type: 'update', currentPassword });
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

console.log('Servidor WebSocket rodando na porta 8080');
