import express from 'express';
import routes from './routes';

class App{
  constructor(){
    this.server = express();

    this.middlewares();
    this.routes();
  }
  middlewares(){
    this.server.use(express.json()); // configura o servidor para json
  }
  routes(){
    this.server.use(routes);
  }
}
export default new App().server;