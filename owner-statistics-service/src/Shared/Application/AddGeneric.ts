import { IGenericRepository } from '../Domain/IGenericRepository';

export class AddGeneric<T> {
  constructor(private repository: IGenericRepository<T>, private body: T) {}

  async dispatch(): Promise<T> {
    return this.repository.add(this.body);
  }
}
