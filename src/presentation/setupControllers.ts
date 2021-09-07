import { Application } from 'express';
import { CarRepository } from '../domain/ports/car.repository';
import { UserRepository } from '../domain/ports/user.repository';
import { ShowCarDetailsEndpoint } from './show-car-details.endpoint';
import { ShowCarListEndpoint } from './show-car-list.endpoint';
import { UserLoginRegisterEndPoint } from './user-login-register.endpoint';

export const setupControllers = (
  app: Application,
  userRepository: UserRepository,
  carRepository: CarRepository
) => {
  new UserLoginRegisterEndPoint().register(app, userRepository);
  new ShowCarListEndpoint().register(app, carRepository);
  new ShowCarDetailsEndpoint().register(app, carRepository);
};
