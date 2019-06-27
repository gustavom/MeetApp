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