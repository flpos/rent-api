import { BaseEntity } from './base.entity';

export class Car extends BaseEntity {
  brand: string;
  model: string;
  year: number;
  color: string;
  kilometers: number;
  imageUrl: string;
  constructor(
    id: string,
    brand: string,
    model: string,
    year: number,
    color: string,
    kilometers: number,
    imageUrl: string
  ) {
    super(id);
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.kilometers = kilometers;
    this.imageUrl = imageUrl;
  }
}
