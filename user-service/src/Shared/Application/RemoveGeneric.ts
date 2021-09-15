import { IGenericRepository } from '../Domain/IGenericRepository';

export class RemoveGeneric<T> {
  constructor(private repository: IGenericRepository<T>, private id: string) {}

  async dispatch(): Promise<T> {
    return this.repository.remove(this.id);
  }
}
