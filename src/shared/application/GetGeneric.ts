import { ICriteria } from '../domain/ICriteria';
import { IGenericRepository } from '../domain/IGenericRepository';

export class GetGeneric<T> {
  constructor(
    private repository: IGenericRepository<T>,
    private criteria: ICriteria,
  ) {}

  async dispatch(): Promise<{ data: T[]; count: number }> {
    return this.repository.query(this.criteria);
  }
}
