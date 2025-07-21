import express from 'express';
import { Sequelize } from 'sequelize';
import { Item } from './models/item';
import itemRoutes from './routes/itemRoutes';
import { logger } from './config/log4js';
import log4js from 'log4js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use log4js connectLogger middleware
app.use(log4js.connectLogger(logger, { level: 'auto' }));

app.use(express.json());
app.use('/items', itemRoutes);

// Sequelize setup
const sequelize = new Sequelize(
  process.env.DB_NAME || 'testdb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'postgres',
  {
    host: process.env.DB_HOST || 'db',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

// Initialize sample data if table is empty
async function initSampleData() {
  const count = await Item.count();
  if (count === 0) {
    await Item.bulkCreate([
      { name: 'Sample Item 1', description: 'This is a sample item.' },
      { name: 'Sample Item 2', description: 'Another sample item.' },
    ]);
    logger.info('Sample data initialized.');
  }
}

async function start() {
  try {
    await sequelize.authenticate();
    await Item.sync();
    await initSampleData();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Unable to start server:', err);
    process.exit(1);
  }
}

start();
