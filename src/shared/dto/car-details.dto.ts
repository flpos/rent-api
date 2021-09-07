import { Car } from '../../domain/entities/car.entity';

export type CarDetailsDto = Pick<
  Car,
  'brand' | 'model' | 'year' | 'color' | 'kilometers' | 'imageUrl'
>;
