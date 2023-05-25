import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import data from './data';
import config from './config';
import userRouter from './routers/userRouter';

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error.reason);
  });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found!' });
  }
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.use(cors());
app.post('/api/signin', (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // Perform sign-in logic, such as validating the credentials
  // and returning the response or data
  // Example:
  if (email === 'alexalbu001@gmail.com' && password === '123') {
    const userInfo = {
      id: 1,
      name: 'John Doe',
      email: 'alexalbu001@gmail.com',
    };
    return res.status(200).json(userInfo);
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.listen(8081, () => {
  console.log('serve at http://localhost:8081');
});