import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import auth from './middlewares/auth';
import errorMiddleware from './middlewares/errorMiddleware';
import router from './routes/router';

dotenv.config();

const { PORT = 3000, NAME_API = '/' } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use(NAME_API, router);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errors());
app.use(errorMiddleware);

app.listen(+PORT, () => {
  console.log('Run server on port', PORT);
});
