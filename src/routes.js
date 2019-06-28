import {Router} from 'express';

const routes = new Router();

routes.get('/', (req, res)=>{
  res.send({message: 'Hello world'})
});

export default routes;