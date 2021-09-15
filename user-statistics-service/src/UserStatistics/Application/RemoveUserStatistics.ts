import { GetGeneric } from 'src/Shared/Application/GetGeneric';
import { RemoveGeneric } from 'src/Shared/Application/RemoveGeneric';
import { EFieldOperators } from 'src/Shared/Domain/EFieldOperators';
import { ICriteria } from 'src/Shared/Domain/ICriteria';
import { IGenericRepository } from 'src/Shared/Domain/IGenericRepository';
import { ICard } from '../Domain/ICard';
import { IUserStatistics } from '../Domain/IUserStatistics';

export class RemoveUserStatistics {
  constructor(
    private repository: IGenericRepository<IUserStatistics>,
    private card: ICard,
  ) {}

  async dispatch(): Promise<void> {
    const criteria: ICriteria = {
      limit: 0,
      offset: 0,
      filters: [
        {
          filterField: 'cardId',
          filterOperator: EFieldOperators.AND_EQUAL,
          filterValue: this.card.id,
        },
      ],
    };
    const getGeneric = new GetGeneric(this.repository, criteria);
    const { data: rawStatistics } = await getGeneric.dispatch();

    if (rawStatistics.length !== 1) {
      return;
    }

    const removeGeneric = new RemoveGeneric(
      this.repository,
      `${rawStatistics.shift().id}`,
    );
    await removeGeneric.dispatch();
  }
}
