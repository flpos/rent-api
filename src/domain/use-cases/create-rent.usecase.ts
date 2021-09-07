import { CreateRentDto } from '../../shared/dto/create-rent.dto';
import { RentDto } from '../../shared/dto/rent.dto';
import { CarRepository } from '../ports/car.repository';
import { RentRepository } from '../ports/rent.repository';
import { UserRepository } from '../ports/user.repository';
import { BaseUseCase } from './base.usecase';

const day = 24 * 60 * 60 * 1000;

export class CreateRent implements BaseUseCase<CreateRentDto, RentDto> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarRepository,
    private readonly rentRepository: RentRepository
  ) {}
  async execute(payload: CreateRentDto): Promise<RentDto> {
    if (isNaN(payload.start.valueOf()) || isNaN(payload.end.valueOf())) {
      throw new Error('both dates should be valid');
    }
    if (payload.end.valueOf() - payload.start.valueOf() > 30 * day) {
      throw new Error('cannot rent for more than 30 days');
    }
    const user = await this.userRepository.findById(payload.userId);
    if (!user) {
      throw new Error('Invalid User');
    }
    const car = await this.carRepository.findById(payload.carId);
    if (!car) {
      throw new Error('Invalid Car');
    }

    const existingCarRent = await this.rentRepository.findByCarAndInterval(
      payload.start,
      payload.end,
      payload.carId
    );
    if (existingCarRent) {
      throw new Error('A rent for the selected car and period already exists');
    }
    
    const existingUserRent = await this.rentRepository.findByUserAndInterval(
      payload.start,
      payload.end,
      payload.userId
    );
    if (existingUserRent) {
      throw new Error('A rent for this user and period already exists');
    }

    return this.rentRepository.create({
      start: payload.start,
      end: payload.end,
      car,
      user,
    });
  }
}
