# Totem Digital - Prefeitura Municipal de Areia Branca

## Descrição do Projeto

Sistema de totem digital para a Prefeitura Municipal de Areia Branca, desenvolvido em **HTML/CSS/JS** no front-end, com backend em **Node.js**. O sistema gera senhas para atendimento e se conecta com outros dispositivos (tablets, painéis de chamada) via rede, garantindo atendimento organizado e eficiente.

---

## Funcionalidades

* Geração e controle de senhas em tempo real.
* Comunicação em rede entre totem, tablets e painel de chamadas.
* Interface touchscreen para fácil operação no totem.
* Backend em Node.js para gerenciar conexões e sincronização entre dispositivos.
* Sistema escalável para diferentes setores e tipos de atendimento.

---

## Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3, JavaScript
* **Back-end:** Node.js (Express, WebSocket, ou outro protocolo conforme implementação)
* Comunicação via WebSocket ou REST API para integração entre dispositivos.

---

## Como usar

1. **Instale o Node.js** (se ainda não tiver) na máquina que vai rodar o servidor.

2. **Clone o projeto** e instale as dependências:

   ```bash
   git clone <repo-url>
   cd totem-areia-branca
   npm install
   ```

3. **Inicie o servidor Node.js**:

   ```bash
   npm start
   ```

   Ou o comando configurado no `package.json`.

4. **Acesse o totem pelo navegador** apontando para o IP e porta do servidor (exemplo: `http://192.168.0.100:3000`).

5. **Utilize o tablet ou outros dispositivos conectados** para gerar e chamar senhas, tudo sincronizado via backend Node.js.

---

## Requisitos

* Node.js (versão mínima recomendada: 16.x)
* Rede local para comunicação entre dispositivos
* Navegador moderno nos dispositivos front-end (totem, tablets)

---

## Próximos passos

* Melhorar segurança da comunicação entre dispositivos.
* Adicionar painel de controle administrativo.
* Implementar histórico e relatórios das senhas geradas.

---

## Contato

Luan – Designer e Programador
Email: [joseluanb200@outlook.com](mailto:joseluanb200@outlook.com)
Telefone: (84) 98630-1184
