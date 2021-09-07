import { Application } from 'express';
import { CarRepository } from '../domain/ports/car.repository';
import { ShowCarDetails } from '../domain/use-cases/show-car-details.usecase';

export class ShowCarDetailsEndpoint {
  register(app: Application, carRepository: CarRepository) {
    app.get('/car/:id', async (req, res) => {
      const { id } = req.params;
      const useCase = new ShowCarDetails(carRepository);

      const result = await useCase.execute(id);
      res.json(result);
    });
  }
}
