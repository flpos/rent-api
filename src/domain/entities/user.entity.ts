import { BaseEntity } from './base.entity';

export class User extends BaseEntity {
  name: string;
  email: string;
  constructor(id: string, name: string, email: string) {
    super(id);
    this.name = name;
    this.email = email;
  }
}
