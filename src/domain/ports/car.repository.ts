import { Car } from '../entities/car.entity';
import { BaseRepository } from './base.repository';

export abstract class CarRepository extends BaseRepository<Car> {}
