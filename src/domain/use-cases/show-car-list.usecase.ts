import { CarListDto } from '../../shared/dto/car-list.dto';
import { CarRepository } from '../ports/car.repository';
import { BaseUseCase } from './base.usecase';

export class ShowCarList implements BaseUseCase<undefined, Array<CarListDto>> {
  constructor(private readonly carRepository: CarRepository) {}
  async execute(): Promise<CarListDto[]> {
    const result = await this.carRepository.findAll();

    return result.map((c) => ({
      id: c.id,
      brand: c.brand,
      imageUrl: c.imageUrl,
      model: c.model,
      year: c.year,
    }));
  }
}
