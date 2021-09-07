import { Application } from 'express';
import { CarRepository } from '../domain/ports/car.repository';
import { RentRepository } from '../domain/ports/rent.repository';
import { UserRepository } from '../domain/ports/user.repository';
import { CreateRent } from '../domain/use-cases/create-rent.usecase';

export class CreateRentEndpoint {
  register(
    app: Application,
    userRepository: UserRepository,
    carRepository: CarRepository,
    rentRepository: RentRepository
  ) {
    app.get('/car/:id', async (req, res) => {
      const payload = req.body;
      const useCase = new CreateRent(
        userRepository,
        carRepository,
        rentRepository
      );

      const result = await useCase.execute(payload);
      res.json(result);
    });
  }
}
