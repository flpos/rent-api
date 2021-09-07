import { Car } from '../../domain/entities/car.entity';

export type CarListDto = Pick<Car, 'brand' | 'model' | 'year' | 'imageUrl'>;
