import { CarMemoryRepository } from '../../data/memory-cached/car-memory-cached.repository';
import { ShowCarList } from './show-car-list.usecase';

describe('show-car-list usecase', () => {
  it('returns all persisted cars', async () => {
    const carRepository = new CarMemoryRepository();
    const useCase = new ShowCarList(carRepository);
    const result = await useCase.execute();

    expect(result.length).toBe(3);

    expect(result[0].brand).toBe('Ford');
    expect((result[0] as any).color).toBeUndefined();
  });
});
