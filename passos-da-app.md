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
# o sucrese adiciona a sintaxe de import # from e o export default
# o nodemon da restart no servidor quando qualquer arquivo da app é salvo
npm install sucrase nodemon -D
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

### 8 - Atualização de sintaxe
Nos arquivos `app.js`, `server.js` e `router.js`, atualize a sintaxe, como no exemplo abaixo:

```js
const xyz = require('abc');
// para
import xyz from 'abc'

// Mude também
module.exports = xyz
// para
export default xyz
```

### 9 - Script dev em package.json
No arquivo `package.json`, em `scripts`, adicione:
```js
"dev": "nodemon src/server.js"
``` 

### 10 - Criando arquivo de configuração do nodemon
Na raiz do projeto, crie o arquivo `nodemon.json`:

```sh
touch nodemon.json
```
E no arquivo, adicione
```json
{
  "execMap": {
    "js": "sucrase-node"
  }
}
```

### 11 - Criando o serviço de db postgres com o docker

```sh
docker run --name databasemeetapp -e POSTGRES_PASSWORD=docker p 5432:5432 -d postgres
```

No banco de dados, cria database "meetapp". Pode usar o postbird para isso.

### 12 - Instalando o ESlint

```sh
npm install eslint -D
```

Instale o airbnb styleguide.
O arquivo completo de conf do eslintrc esta no repositório do projeto.

Comando para fix automático:

```sh
yarn eslint --fix src --ext .js
```

### 12 - Instalando o prettier

```sh
npm install prettier eslint-config-prettier eslint-plugin-prettier -D
```
Crie o arquivo prettierrc
```sh
touch .prettierrc
```
No arquivo, configure:
```json
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```


### 13 - Editor config 
Crie o arquivo `.editorconfig`

```sh
touch .editorconfig
```

No arquivo, configure:
```
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = false
```