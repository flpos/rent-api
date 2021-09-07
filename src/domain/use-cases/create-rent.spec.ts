import { CarMemoryRepository } from '../../data/memory-cached/car-memory-cached.repository';
import { RentMemoryRepository } from '../../data/memory-cached/rent-memory-cached.repository';
import { UserMemoryRepository } from '../../data/memory-cached/user-memory-cached.repository';
import { CarRepository } from '../ports/car.repository';
import { RentRepository } from '../ports/rent.repository';
import { UserRepository } from '../ports/user.repository';
import { CreateRent } from './create-rent.usecase';

let userRepository: UserRepository;
let carRepository: CarRepository;
let rentRepository: RentRepository;
let useCase: CreateRent;

beforeEach(() => {
  userRepository = new UserMemoryRepository();
  carRepository = new CarMemoryRepository();
  rentRepository = new RentMemoryRepository();
  useCase = new CreateRent(userRepository, carRepository, rentRepository);
});

describe('create-reservation usecase', () => {
  it('throws error if one of the dates is not valid', async () => {
    expect(
      useCase.execute({
        carId: '0',
        userId: '0',
        start: new Date('2021-09-01'),
        end: new Date('abc'),
      })
    ).rejects.toThrow('both dates should be valid');
    expect(
      useCase.execute({
        carId: '0',
        userId: '0',
        start: new Date('test'),
        end: new Date('2021-09-01'),
      })
    ).rejects.toThrow('both dates should be valid');
  });
  it('throws error if the interval is more than 30 days', async () => {
    expect(
      useCase.execute({
        carId: '0',
        userId: '0',
        start: new Date('2021-08-01'),
        end: new Date('2021-09-01'),
      })
    ).rejects.toThrow('cannot rent for more than 30 days');
    expect(() => {
      useCase.execute({
        carId: '0',
        userId: '0',
        start: new Date('2021-09-02'),
        end: new Date('2021-10-01'),
      });
    }).not.toThrow('cannot rent for more than 30 days');
  });
  it('throws error if the user does not exists', () => {
    expect(
      useCase.execute({
        carId: '0',
        userId: '5',
        start: new Date('2021-08-02'),
        end: new Date('2021-09-01'),
      })
    ).rejects.toThrow('Invalid User');
  });
  it('throws error if the car does not exists', () => {
    expect(
      useCase.execute({
        carId: '10',
        userId: '0',
        start: new Date('2021-08-02'),
        end: new Date('2021-09-01'),
      })
    ).rejects.toThrow('Invalid Car');
  });
  it('throws error if the car is rented for the period', async () => {
    await useCase.execute({
      carId: '0',
      userId: '0',
      start: new Date('2021-08-02'),
      end: new Date('2021-09-01'),
    });

    expect(
      useCase.execute({
        carId: '0',
        userId: '1',
        start: new Date('2021-08-02'),
        end: new Date('2021-09-01'),
      })
    ).rejects.toThrow('A rent for the selected car and period already exists');
  });
  it('throws error if the user rented in the period', async () => {
    await useCase.execute({
      carId: '0',
      userId: '0',
      start: new Date('2021-08-02'),
      end: new Date('2021-09-01'),
    });

    expect(
      useCase.execute({
        carId: '1',
        userId: '0',
        start: new Date('2021-08-31'),
        end: new Date('2021-09-10'),
      })
    ).rejects.toThrow('A rent for this user and period already exists');
  });
});
