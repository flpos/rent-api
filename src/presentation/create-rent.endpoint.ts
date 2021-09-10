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
    app.post('/confirm-reservation', async (req, res) => {
      const { start, end, userId, carId } = req.body;
      const useCase = new CreateRent(
        userRepository,
        carRepository,
        rentRepository
      );

      try {
        const result = await useCase.execute({
          start: new Date(start),
          end: new Date(end),
          carId,
          userId,
        });
        res.json(result);
      } catch (err) {
        res.status(500).send((err as Error).message);
      }
    });
  }
}
