import { Rent } from '../../domain/entities/rent.entity';
import { RentRepository } from '../../domain/ports/rent.repository';

export class RentMemoryRepository implements RentRepository {
  rents: Array<Rent> = [];

  async findByCarAndInterval(
    start: Date,
    end: Date,
    carId: string
  ): Promise<Rent | null> {
    const rent = this.rents.find((rent) => {
      if (rent.car.id !== carId) return false;
      return (
        start.valueOf() < rent.end.valueOf() ||
        rent.start.valueOf() < end.valueOf()
      );
    });
    return rent ?? null;
  }
  async findByUserAndInterval(
    start: Date,
    end: Date,
    userId: string
  ): Promise<Rent | null> {
    return (
      this.rents.find((rentItem) => {
        if (rentItem.user.id !== userId) return false;
        return (
          start.valueOf() < rentItem.end.valueOf() ||
          rentItem.start.valueOf() < end.valueOf()
        );
      }) ?? null
    );
  }
  async create(payload: Omit<Rent, 'id'>): Promise<Rent> {
    const newLength = this.rents.push({
      ...payload,
      id: `${this.rents.length}`,
    });

    return this.rents[newLength - 1];
  }
  update(id: string, payload: Omit<Rent, 'id'>): Promise<Rent | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Rent[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Rent | null> {
    throw new Error('Method not implemented.');
  }
}
