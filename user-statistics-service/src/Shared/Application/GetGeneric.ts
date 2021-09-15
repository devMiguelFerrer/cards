import { ICriteria } from '../Domain/ICriteria';
import { IGenericRepository } from '../Domain/IGenericRepository';

export class GetGeneric<T> {
  constructor(
    private repository: IGenericRepository<T>,
    private criteria: ICriteria,
  ) {}

  async dispatch(): Promise<{ data: T[]; count: number }> {
    return this.repository.query(this.criteria);
  }
}
