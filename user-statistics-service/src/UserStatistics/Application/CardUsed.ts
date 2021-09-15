import { GetGeneric } from 'src/Shared/Application/GetGeneric';
import { UpdateGeneric } from 'src/Shared/Application/UpdateGeneric';
import { EFieldOperators } from 'src/Shared/Domain/EFieldOperators';
import { ICriteria } from 'src/Shared/Domain/ICriteria';
import { IGenericRepository } from 'src/Shared/Domain/IGenericRepository';
import { ICard } from '../Domain/ICard';
import { IUserStatistics } from '../Domain/IUserStatistics';

export class CardUsed {
  constructor(
    private repository: IGenericRepository<IUserStatistics>,
    private card: ICard,
  ) {}

  async dispatch(): Promise<IUserStatistics> {
    const criteria: ICriteria = {
      limit: 0,
      offset: 0,
      filters: [
        {
          filterField: 'cardId',
          filterOperator: EFieldOperators.AND_EQUAL,
          filterValue: this.card.id,
        },
        {
          filterField: 'userId',
          filterOperator: EFieldOperators.AND_EQUAL,
          filterValue: this.card.userId,
        },
      ],
    };
    const getGeneric = new GetGeneric(this.repository, criteria);
    const { data: rawStatistics } = await getGeneric.dispatch();

    if (rawStatistics.length !== 1) {
      return;
    }

    const ownerStatistics: IUserStatistics = {
      ...rawStatistics.shift(),
    };
    ownerStatistics.cardUses += 1;

    const updateGeneric = new UpdateGeneric(this.repository, ownerStatistics);
    return await updateGeneric.dispatch();
  }
}
