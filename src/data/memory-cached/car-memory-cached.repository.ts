import { Car } from '../../domain/entities/car.entity';
import { CarRepository } from '../../domain/ports/car.repository';

export class CarMemoryRepository implements CarRepository {
  cars: Array<Car> = [];

  constructor() {
    this.create({
      brand: 'Ford',
      model: 'Ka',
      color: 'black',
      imageUrl: 'https://google.com/some-image.jpg',
      kilometers: 200,
      year: 2020,
    });
    this.create({
      brand: 'Chevrolet',
      model: 'Onix',
      color: 'gray',
      imageUrl: 'https://google.com/some-image.jpg',
      kilometers: 100,
      year: 2019,
    });
    this.create({
      brand: 'Fiat',
      model: 'Uno',
      color: 'red',
      imageUrl: 'https://google.com/some-image.jpg',
      kilometers: 80,
      year: 2021,
    });
  }

  async create(payload: Omit<Car, 'id'>): Promise<Car> {
    const newLength = this.cars.push({
      ...payload,
      id: `${this.cars.length}`,
    });
    return this.cars[newLength - 1];
  }
  async update(id: string, payload: Omit<Car, 'id'>): Promise<Car | null> {
    const index = this.cars.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.cars[index] = { ...this.cars[index], ...payload };
    return this.cars[index];
  }
  async findAll(): Promise<Car[]> {
    return this.cars;
  }
  async findById(id: string): Promise<Car | null> {
    return this.cars.find((c) => c.id === id) ?? null;
  }
}
