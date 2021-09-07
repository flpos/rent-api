import { Rent } from '../entities/rent.entity';
import { BaseRepository } from './base.repository';

export abstract class RentRepository extends BaseRepository<Rent> {
  abstract findByCarAndInterval(
    start: Date,
    end: Date,
    carId: string
  ): Promise<Rent | null>;

  abstract findByUserAndInterval(
    start: Date,
    end: Date,
    userId: string
  ): Promise<Rent | null>;
}
