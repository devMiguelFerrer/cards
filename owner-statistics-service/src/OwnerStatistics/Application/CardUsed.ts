import { GetGeneric } from 'src/Shared/Application/GetGeneric';
import { UpdateGeneric } from 'src/Shared/Application/UpdateGeneric';
import { EFieldOperators } from 'src/Shared/Domain/EFieldOperators';
import { ICriteria } from 'src/Shared/Domain/ICriteria';
import { IGenericRepository } from 'src/Shared/Domain/IGenericRepository';
import { ICard } from '../Domain/ICard';
import { IOwnerStatistics } from '../Domain/IOwnerStatistics';

export class CardUsed {
  constructor(
    private repository: IGenericRepository<IOwnerStatistics>,
    private card: ICard,
  ) {}

  async dispatch(): Promise<IOwnerStatistics> {
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

    const ownerStatistics: IOwnerStatistics = {
      ...rawStatistics.shift(),
    };
    ownerStatistics.cardUses += 1;

    const updateGeneric = new UpdateGeneric(this.repository, ownerStatistics);
    return await updateGeneric.dispatch();
  }
}
