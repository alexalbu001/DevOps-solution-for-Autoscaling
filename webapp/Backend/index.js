const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Set up Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define models
const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.INTEGER
}, {});

const Order = sequelize.define('Order', {
  quantity: DataTypes.INTEGER
}, {});

Order.belongsTo(Product);

// Sync database
sequelize.sync();

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// Create a new order
app.post('/orders', async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findByPk(productId);
  if (!product) return res.status(404).send('Product not found');

  const order = await Order.create({
    ProductId: product.id,
    quantity: quantity
  });

  res.status(201).json(order);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
