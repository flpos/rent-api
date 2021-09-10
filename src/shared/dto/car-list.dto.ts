import { Car } from '../../domain/entities/car.entity';

export type CarListDto = Pick<
  Car,
  'id' | 'brand' | 'model' | 'year' | 'imageUrl'
>;
