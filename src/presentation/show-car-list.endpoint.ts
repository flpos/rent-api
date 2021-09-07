import { Application } from 'express';
import { CarRepository } from '../domain/ports/car.repository';
import { ShowCarList } from '../domain/use-cases/show-car-list.usecase';

export class ShowCarListEndpoint {
  register(app: Application, carRepository: CarRepository) {
    app.get('/car', async (req, res) => {
      const useCase = new ShowCarList(carRepository);

      const result = await useCase.execute();
      res.json(result);
    });
  }
}
