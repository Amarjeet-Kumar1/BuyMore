import express from 'express';
import Product from '../models/productModel.js';
import expressAsynHandler from 'express-async-handler';
const productRouter = express.Router();
import { isAuth, isAdmin } from '../utils.js';

productRouter.get('/', async (req, res) => {
  const product = await Product.find();
  res.send(product);
});

productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsynHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || 3;
    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});
export default productRouter;
