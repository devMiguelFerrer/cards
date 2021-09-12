import { IGenericRepository } from '../domain/IGenericRepository';

export class AddGeneric<T> {
  constructor(private repository: IGenericRepository<T>, private body: T) {}

  async dispatch(): Promise<void> {
    return this.repository.add(this.body);
  }
}
