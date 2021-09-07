import express from 'express';
import { CarMemoryRepository } from './data/memory-cached/car-memory-cached.repository';
import { RentMemoryRepository } from './data/memory-cached/rent-memory-cached.repository';
import { UserMemoryRepository } from './data/memory-cached/user-memory-cached.repository';
import { setupControllers } from './presentation/setupControllers';

const app = express();
app.use(express.json());

const carRepository = new CarMemoryRepository();
const userRepository = new UserMemoryRepository();
const rentRepository = new RentMemoryRepository();

setupControllers(app, userRepository, carRepository, rentRepository);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`serving on port: ${port}`));
