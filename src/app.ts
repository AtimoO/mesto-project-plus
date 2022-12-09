import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(+PORT, () => {
  console.log('Run server on port', PORT);
});
