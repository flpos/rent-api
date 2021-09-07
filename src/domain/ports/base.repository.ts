export abstract class BaseRepository<T> {
  abstract create(payload: Omit<T, 'id'>): Promise<T>;
  abstract update(id: string, payload: Omit<T, 'id'>): Promise<T | null>;
  abstract findAll(): Promise<Array<T>>;
  abstract findById(id: string): Promise<T | null>;
}
