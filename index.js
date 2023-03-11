const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const supplyRouter = require('./routes/supplyRoutes');
const eventRouter = require('./routes/eventRoutes');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Supply Chain Track and Trace',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
      {
        url: 'http://164.92.234.49',
      },
    ],
  },
  apis: ['./routes/*.js'],
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerSpec = swaggerJSDoc(options);

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.get('/api', (req, res) => {
  res.send('<h2>Hi There!!!</h2>');
});

app.use('/api/supply', supplyRouter);
app.use('/api/item', eventRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
