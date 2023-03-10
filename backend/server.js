import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/upload', uploadRouter);
// app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`serve at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error in connecting database ${err.message}`);
  });
