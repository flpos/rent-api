import { Collection, Db, MongoClient } from 'mongodb';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/ports/user.repository';

export class UserMongodbRepository implements UserRepository {
  userCollection: Collection<User>;
  constructor(mongoDatabase: Db) {
    this.userCollection = mongoDatabase.collection<User>('users');
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userCollection.findOne({ email });
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
    const { value } = await this.userCollection.findOneAndUpdate(
      { id },
      payload
    );
    return value;
  }
  async findAll(): Promise<User[]> {
    return this.userCollection.find().readBufferedDocuments();
  }
  findById(id: string): Promise<User | null> {
    return this.userCollection.findOne({ id });
  }
}
