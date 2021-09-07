import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/ports/user.repository';

export class UserMemoryRepository implements UserRepository {
  users: Array<User> = [];

  constructor() {
    this.create({ name: 'test1', email: 'test1@abc.com' });
    this.create({ name: 'test2', email: 'test2@abc.com' });
    this.create({ name: 'test3', email: 'test3@abc.com' });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }
  async create(payload: Omit<User, 'id'>): Promise<User> {
    const newLength = this.users.push({
      ...payload,
      id: `${this.users.length}`,
    });
    return this.users[newLength - 1];
  }
  async update(id: string, payload: Omit<User, 'id'>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...payload };
    return this.users[index];
  }
  async findAll(): Promise<User[]> {
    return this.users;
  }
  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }
}
