import { Collection, Db, ObjectId, Document } from 'mongodb';
import { Rent } from '../../domain/entities/rent.entity';
import { RentRepository } from '../../domain/ports/rent.repository';

export class RentMongodbRepository implements RentRepository {
  rentCollection: Collection<Rent & Document>;
  constructor(db: Db) {
    this.rentCollection = db.collection('rents');
  }
  async findByCarAndInterval(
    start: Date,
    end: Date,
    carId: string
  ): Promise<Rent | null> {
    const rent = await this.rentCollection.findOne({
      $and: [
        { 'car.id': new ObjectId(carId) },
        { $or: [{ end: { $gt: start } }, { start: { $lt: end } }] },
      ],
    });
    if (!rent) {
      return null;
    }
    rent.id = rent._id;
    return rent;
  }
  findByUserAndInterval(
    start: Date,
    end: Date,
    userId: string
  ): Promise<Rent | null> {
    return this.rentCollection.findOne({
      $and: [
        { 'user.id': new ObjectId(userId) },
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
      { _id: new ObjectId(id) },
      payload
    );
    return value;
  }
  findAll(): Promise<Rent[]> {
    return this.rentCollection.find().toArray();
  }
  findById(id: string): Promise<Rent | null> {
    return this.rentCollection.findOne({ _id: new ObjectId(id) });
  }
}
