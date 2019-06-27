# Passo a passo para montagem da aplicação.

### 1 - Instalando o express

```sh
npm install express
```
### 2 - Crie a pasta src na raiz da aplicação e arquivos iniciais

```sh
mkdir src
```
Na pasta /src, crie os arquivos 'app.js', 'routes.js', 'server.js'
```sh
touch src/app.js src/routes.js src/server.js
```
### 3 - Instalando outros recursos
```sh
# o sequelize (orm) para fazer a interação com banco de dados
npm install sequelize
```
```sh
# o nodemon da restart no servidor quando qualquer arquivo da app é salvo
npm install nodemon -D
```

### 4 - Arquivo app.js
- Importe o express
  - `const express = require('express');`
- Importe as rotas
  - `const routes = require('./routes');`
- Crie a class App
- Na class App, crie o método `constructor(){}`
- Dentro método `constructor`, declare o o servidor 
  - `this.server = express();`
- crie os métodos: 
  - `middlewares(){}`
  - `routes(){}`
- em `middlewares(){}`, crie o middleware para o servidor sempre usar json.
  - `this.server.use(express.json());`
- em `routes(){}`
  - `this.server.use(routes)`
- dentro do `constructor`:
  - `this.middlewares();`
  - `this.routes();`
- Exporte:
  - `module.exports = new App().server;`

### 5 - Arquivo server.js
- Importe o App
  - `const app = require('./app);`
- Declare a porta
  - `app.listen(3333);`

### 6 - Arquivo routes.js
- Importe o `Router`
  - `const {Router} = require('express');`
- Declare
  - `const routes = new Router();`
  - `module.exports = routes;`
- Crie uma rota teste
  - `routes.get('/', (req,res)=>{ return res.send({ message: 'Hello World' }) });`

### 7 - teste a rota teste
- no terminal rode:
  - `node src/server.js`
- Acesse [http://localhost:3333](http://localhost:3333)