import express from 'express';
import Product from '../models/productModel.js';
import expressAsynHandler from 'express-async-handler';
const productRouter = express.Router();
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

productRouter.get('/', async (req, res) => {
  const product = await Product.find();
  res.send(product);
});
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsynHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send('Product Updated');
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/create',
  isAuth,
  isAdmin,
  expressAsynHandler(async (req, res) => {
    const product = await Product.create({
      name: req.body.name,
      slug: req.body.slug,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category,
      brand: req.body.brand,
      countInStock: req.body.countInStock,
      description: req.body.description,
    });
    await product.save();
    if (product) {
      res.send('Product Created');
    } else {
      res.status(404).send({ message: 'Error in creating product' });
    }
  })
);

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
