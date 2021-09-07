import { CarDetailsDto } from '../../shared/dto/car-details.dto';
import { CarRepository } from '../ports/car.repository';
import { BaseUseCase } from './base.usecase';

export class ShowCarDetails implements BaseUseCase<string, CarDetailsDto> {
  constructor(private readonly carRepository: CarRepository) {}
  execute(id: string): Promise<CarDetailsDto | null> {
    return this.carRepository.findById(id);
  }
}
