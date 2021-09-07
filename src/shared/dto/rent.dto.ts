import { Rent } from '../../domain/entities/rent.entity';

export type RentDto = Pick<Rent, 'id' | 'start' | 'end' | 'car'>;
