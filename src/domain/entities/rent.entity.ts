import { BaseEntity } from './base.entity';
import { Car } from './car.entity';
import { User } from './user.entity';

export class Rent extends BaseEntity {
  start: Date;
  end: Date;
  user: User;
  car: Car;
  constructor(id: string, start: Date, end: Date, user: User, car: Car) {
    super(id);
    this.start = start;
    this.end = end;
    this.user = user;
    this.car = car;
  }
}
