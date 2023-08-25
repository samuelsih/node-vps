import express, { Express } from 'express';
import { something } from '@/controller/something';
import { register } from './controller/auth';
import withErrorHandling from '@/middleware/globalErrorHandling';

const app: Express = express();
const port = 5000;

app.use(express.json());

app.get('/', something);
app.post('/register', withErrorHandling(register));

app.listen(port, '0.0.0.0', () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
