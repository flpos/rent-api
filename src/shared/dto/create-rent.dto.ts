import { Rent } from '../../domain/entities/rent.entity';

export type CreateRentDto = Pick<Rent, 'start' | 'end'> & {
  carId: string;
  userId: string;
};
