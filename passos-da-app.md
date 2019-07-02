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

### Continuando a App - Configs

Crie a pasta `config` dentro de `src`
```sh
mkdir src/config
```

Crie o arquivo `database.js` dentro de config
```sh
touch src/config/database.js
```


### Continuando a App - Pasta database

Crie a pasta `database` dentro de `src`
```sh
mkdir src/database
```

Crie a pasta `migrations` dentro de `database`
```sh
mkdir src/database/migrations
```

### Continuando a App - Pasta app

Crie a pasta `app` dentro de `src`
```sh
mkdir src/app
```

Crie a pasta `controllers` e `models` dentro de `app`
```sh
mkdir src/app/controllers
mkdir src/app/models
```

### Arquivo `.sequelizerc`

Crie o arquivo `.sequelizerc` e adicione
```sh
touch .sequelizerc
```
```js
const { resolve } = require('path');

module.exports = {
  config: resolve(__dirname, 'src','config', 'database.js'),
  'models-path':resolve(__dirname, 'src', 'app','models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeder-path': resolve(__dirname, 'src', 'database', 'migrations'),
}
```


### Instalando os dialects do sequelize

Instale:

```sh
npm install mysql2 pg pg-hstore
```

### Arquivo `config/database.js`

Adicione

```js
module.exports = {
  // dialect: 'postgres',
  dialect: 'mysql',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'databasemeetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredall: true,
  },
};
```

### Criando a migration de usuário
No terminal, rode o comando para criar a migration de usuário.
A migration faz o papel de criar a estrutura do conteúdo no banco de dados.

```sh
// o comando npx pode ser trocado por yarn
npx sequelize migration:create --name=create-users
```

Vai ser criado um arquivo de migration na pasta `database/migrations`, nele, adicione:
```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
```

### Criando a migration de usuário
No terminal, rode o comando para criar a tabela de usuários

```sh
// o comando npx pode ser trocado por yarn
npx sequelize db:migrate
```


### Criando o model de usuário
Crie o arquivo:
```sh
touch src/app/models/User.js
```

Adicione:
```js
import { Model, Sequelize } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;

```

### Criando a conexão com o banco de dados
Crie o arquivo:
```sh
touch src/database/index.js
```

Adicione

```js
import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseconfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseconfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();

```

No arquivo `src/app.js`, adicione:
```js
import './database';
```

### Criando uma rota de teste
No arquivo `routes.js`, adicione:

```js
import User from './app/models/User';
```

A rota atual, troque por:
```js
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Gustavo Mart',
    email: 'gustavo_crj@hotmail.com',
    password_hash: '123456',
  });
  return res.json(user);
});
```

### User controller

Crie o arquivo:
```sh
touch src/app/controllers/UserController.js
```
Adicione
```js
import User from '../models/User';

class UserController {
  async store(req, res) {
    const user = await User.create(req.body);
    return res.json(user);
  }
}
export default new UserController();
```

No arquivo de rotas:
- Importe o `import User from './app/controllers/UserController.js'`

Deve ficar tudo assim:
```js
import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/user', UserController.store);

export default routes;

```


### Gerando o hash da senha

Instale:

```js
npm install bcryptjs
```

No model de usuário, adicione:
```js
password: Sequelize.VIRTUAL,
```

Depois do método `init()`, adicione:
```js
this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
```

O arquivo vai ficar assim:
```js
import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;

```

### Instal o Jason Web Token
```sh
npm install jsonwebtoken
```

Crie o arquivo:
```sh
touch src/app/controllers/SessionController.js
```
```js
import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, 'd307bd3af3e617baa8b923e3de383d2c', {
        expiresIn: '7d',
      }),
    });
  }
}
export default new SessionController();

```

O método `checkPassword`, foi criado no `UserController.js`
```js
checkPassword(password) {
    return bcrypt.compare(password, this.password_hash); // retorna true se os dois valores batem .compare(valor1, valor2)
  }
```

### Arquivo auth.js
Crie o o arquivo:
```sh
touch src/config/auth.js
```
```js
export default {
  secret: 'your secret md5', // pode gerar isso online
  expiresIn: '7d',
};
```

No SessionsController, importe o arquivo
```js
import authConfig from '../../config/auth';
```
Modifique o token, de:
```js
token: jwt.sign({ id }, 'd307bd3af3e617baa8b923e3de383d2c', {
        expiresIn: '7d',
      }),
```
Para 
```js
token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
```


### Update de usuário
No arquivo `UserController.js`, adicione o método update:
```js
async update(req, res) {
    return res.json({ ok: true });
  }
```

No arquivo `routes.js`, adicione:
```js
routes.put('/users', UserController.update);
```

Crie o arquivo:
```sh
touch src/app/middlewares/auth.js
```
Inicialmente, vamos testar algumas coisas, adicione:
```js
export default (req, res, next) => {
  const authHeader = req.header.authorization;
  console.log(authHeader);

  return next();
};
```

No arquivo de rotas, import o `src/app/middlewares/auth.js`
```js
import authMiddleware from './app/middlewares/auth';
```
E antes da rota de atualização, adicone o middlewares de forma global:
```js
// nossa lista atual de rotas
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.user(authMiddleware);

routes.put('/users', UserController.update);
```

### Verificações no middleware de autenticação
Atualize o arquivo `src/app/middlewares/auth.js`
```js
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.send(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.send(401).json({ error: 'Token invalid' });
  }
};
```

### Verificações no UserController
Atualize o arquivo `UserController.js`
```js
import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    // verificando se o user esta modificando o email
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // verifica se o password atual bate
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match.' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}
export default new UserController();
```

### Validando dados
Instale a lib YUP :
```sh
npm install yup
// yarn add yup
```

No arquivo `UserController.js`, no iníco do método `store`, adicione:
```js
const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.send(400).json({ error: 'Validation fails' });
    }
  ```


  O arquivo `UserController.js`, deve ficar assim:
  ```js
  import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    // verificando se o user esta modificando o email
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // verifica se o password atual bate
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match.' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}
export default new UserController();

```
O arquivo `SessionController.js`, deve ficar assim:
```js

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();


```