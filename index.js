const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const cors = require('cors');
const supplyRouter = require('./routes/supplyRoutes');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require('./config/config');

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// const mongoURL = `mongodb://localhost/supplychain`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
app.enable('trust proxy');
app.use(cors({}));

app.use(express.json());
app.get('/api', (req, res) => {
  res.send('<h2>Hi There!!!</h2>');
});

app.use('/api/users', userRouter);
app.use('/api/supply', supplyRouter);
app.use('/api/order', orderRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
