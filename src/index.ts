import express from 'express';
import { MongoClient } from 'mongodb';
import { CarMongodbRepository } from './data/remote/car-mongodb.repository';
import { RentMongodbRepository } from './data/remote/rent.mongodb.repository';
import { UserMongodbRepository } from './data/remote/user-mongodb.repository';
import { setupControllers } from './presentation/setupControllers';
import cors from 'cors';

const databaseUri =
  process.env.DB_URL || 'mongodb://root:example@localhost:27017';

const app = express();
app.use(express.json());
app.use(cors());

const mongoClient = new MongoClient(databaseUri);
const db = mongoClient.db('rent');

const carRepository = new CarMongodbRepository(db);
const userRepository = new UserMongodbRepository(db);
const rentRepository = new RentMongodbRepository(db);

setupControllers(app, userRepository, carRepository, rentRepository);

const port = process.env.PORT || 3000;

mongoClient
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`serving on port: ${port}, with DB: ${databaseUri}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
