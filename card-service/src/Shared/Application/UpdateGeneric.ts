import { IGenericRepository } from '../Domain/IGenericRepository';

export class UpdateGeneric<T> {
  constructor(private repository: IGenericRepository<T>, private body: T) {}

  async dispatch(): Promise<T> {
    return this.repository.update(this.body);
  }
}
