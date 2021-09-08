import { Collection, Db } from 'mongodb';
import { Rent } from '../../domain/entities/rent.entity';
import { RentRepository } from '../../domain/ports/rent.repository';

export class RentMongodbRepository implements RentRepository {
  rentCollection: Collection<Rent>;
  constructor(db: Db) {
    this.rentCollection = db.collection('rents');
  }
  findByCarAndInterval(
    start: Date,
    end: Date,
    carId: string
  ): Promise<Rent | null> {
    return this.rentCollection.findOne({
      $and: [
        { 'car.id': carId },
        { $or: [{ end: { $gt: start } }, { start: { $lt: end } }] },
      ],
    });
  }
  findByUserAndInterval(
    start: Date,
    end: Date,
    userId: string
  ): Promise<Rent | null> {
    return this.rentCollection.findOne({
      $and: [
        { 'user.id': userId },
        { $or: [{ end: { $gt: start } }, { start: { $lt: end } }] },
      ],
    });
  }
  async create(payload: Omit<Rent, 'id'>): Promise<Rent> {
    const { insertedId } = await this.rentCollection.insertOne(payload);
    const rent = await this.rentCollection.findOne(insertedId);
    if (!rent) {
      throw new Error('error while inserting rent');
    }
    return rent;
  }
  async update(id: string, payload: Omit<Rent, 'id'>): Promise<Rent | null> {
    const { value } = await this.rentCollection.findOneAndUpdate(
      { id },
      payload
    );
    return value;
  }
  findAll(): Promise<Rent[]> {
    return this.rentCollection.find().toArray();
  }
  findById(id: string): Promise<Rent | null> {
    return this.rentCollection.findOne({ id });
  }
}
