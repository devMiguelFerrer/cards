import { ICriteria } from './ICriteria';

export interface IGenericRepository<T> {
  query(criteria: ICriteria): Promise<{ data: T[]; count: number }>;
  add(body: T): Promise<T>;
  update(body: T): Promise<T>;
  remove(id: string): Promise<T>;
}
