import { Collection, Db } from 'mongodb';
import { Car } from '../../domain/entities/car.entity';
import { CarRepository } from '../../domain/ports/car.repository';

export class CarMongodbRepository implements CarRepository {
  carCollection: Collection<Car>;

  constructor(db: Db) {
    this.carCollection = db.collection('cars');
  }

  async create(payload: Omit<Car, 'id'>): Promise<Car> {
    const { insertedId } = await this.carCollection.insertOne(payload);
    const result = await this.carCollection.findOne(insertedId);
    if (!result) {
      throw new Error('error while inserting car');
    }

    return result;
  }
  async update(id: string, payload: Omit<Car, 'id'>): Promise<Car | null> {
    const { value } = await this.carCollection.findOneAndUpdate(
      { id },
      payload
    );
    return value;
  }
  async findAll(): Promise<Car[]> {
    return this.carCollection.find().toArray();
  }
  findById(id: string): Promise<Car | null> {
    return this.carCollection.findOne({ id });
  }
}
