import { CarMemoryRepository } from '../../data/memory-cached/car-memory-cached.repository';
import { ShowCarDetails } from './show-car-details.usecase';

describe('show-car-details usecase', () => {
  it('returns information about a specifc car', async () => {
    const carRepository = new CarMemoryRepository();
    const useCase = new ShowCarDetails(carRepository);

    let result = await useCase.execute('0');
    expect(result!.brand).toBe('Ford'); //mock data
    expect(result!.kilometers).toBe(200); //mock data

    result = await useCase.execute('1');
    expect(result!.brand).toBe('Chevrolet'); //mock data
    expect(result!.kilometers).toBe(100); //mock data
  });
});
