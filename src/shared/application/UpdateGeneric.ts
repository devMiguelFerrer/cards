import { IGenericRepository } from "../domain/IGenericRepository";

export class UpdateGeneric<T> {
  constructor(private repository: IGenericRepository<T>, private body: T) {}

  async dispatch(): Promise<void> {
    return this.repository.update(this.body);
  }
}
