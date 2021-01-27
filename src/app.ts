import express from 'express';
import routes from './routes';

//importação do arquivo de definição de rotas para '/transactions'
import transactionRouter from './routes/transaction.routes';

const app = express();
app.use(express.json());
app.use(routes);

//Configurando a rota e o objeto de tratativas de rota
routes.use('/transactions', transactionRouter);

export default app;
