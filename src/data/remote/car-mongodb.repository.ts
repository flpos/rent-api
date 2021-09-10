import { Collection, Db, ObjectId } from 'mongodb';
import { Car } from '../../domain/entities/car.entity';
import { CarRepository } from '../../domain/ports/car.repository';
import { Document } from 'mongodb';

export class CarMongodbRepository implements CarRepository {
  carCollection: Collection<Car & Document>;

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
      { _id: new ObjectId(id) },
      { $set: { ...payload } }
    );
    return value;
  }
  async findAll(): Promise<Car[]> {
    return this.carCollection
      .find()
      .toArray()
      .then((cars) => cars.map((c) => ({ ...c, id: c._id })));
  }
  async findById(id: string): Promise<Car | null> {
    const car = await this.carCollection.findOne({ _id: new ObjectId(id) });
    if (!car) return null;
    car.id = car._id;
    return car;
  }
}
