import { Application } from 'express';
import { CarRepository } from '../domain/ports/car.repository';
import { RentRepository } from '../domain/ports/rent.repository';
import { UserRepository } from '../domain/ports/user.repository';
import { CreateRentEndpoint } from './create-rent.endpoint';
import { ShowCarDetailsEndpoint } from './show-car-details.endpoint';
import { ShowCarListEndpoint } from './show-car-list.endpoint';
import { UserLoginRegisterEndPoint } from './user-login-register.endpoint';

export const setupControllers = (
  app: Application,
  userRepository: UserRepository,
  carRepository: CarRepository,
  rentRepository: RentRepository
) => {
  new UserLoginRegisterEndPoint().register(app, userRepository);
  new ShowCarListEndpoint().register(app, carRepository);
  new ShowCarDetailsEndpoint().register(app, carRepository);
  new CreateRentEndpoint().register(
    app,
    userRepository,
    carRepository,
    rentRepository
  );
};
