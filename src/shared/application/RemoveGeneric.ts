import { IGenericRepository } from '../domain/IGenericRepository';

export class RemoveGeneric<T> {
  constructor(private repository: IGenericRepository<T>, private id: string) {}

  async dispatch(): Promise<void> {
    return this.repository.remove(this.id);
  }
}
