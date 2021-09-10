import { Collection, Db, ObjectId, Document } from 'mongodb';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/ports/user.repository';

export class UserMongodbRepository implements UserRepository {
  userCollection: Collection<User & Document>;
  constructor(mongoDatabase: Db) {
    this.userCollection = mongoDatabase.collection<User>('users');
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userCollection.findOne({ email });
    if (!user) return null;
    user.id = user._id;
    return user;
  }
  async create(payload: Omit<User, 'id'>): Promise<User> {
    const { insertedId } = await this.userCollection.insertOne(payload);
    const document = await this.userCollection.findOne(insertedId);
    if (!document) {
      throw new Error('Error while inserting user');
    }
    return document;
  }
  async update(id: string, payload: Omit<User, 'id'>): Promise<User | null> {
    const update = await this.userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name: payload.name, email: payload.email } }
    );
    const user = await this.findById(id);
    return user;
  }
  async findAll(): Promise<User[]> {
    return (await this.userCollection.find().toArray()).map((u) => {
      u.id = u._id;
      return u;
    });
  }
  async findById(id: string): Promise<User | null> {
    const result = await this.userCollection.findOne({ _id: new ObjectId(id) });
    if (!result) return null;
    result.id = (result as any)._id;
    return result;
  }
}
