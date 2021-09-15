import { ICriteria } from '../Domain/ICriteria';
import { EntityTarget, getConnection, SelectQueryBuilder } from 'typeorm';
import { IGenericRepository } from '../Domain/IGenericRepository';
import { EFieldOperators } from '../Domain/EFieldOperators';

export class GenericRepository<T extends { id: number }>
  implements IGenericRepository<T>
{
  constructor(private entity: EntityTarget<any>) {}

  async query(criteria: ICriteria): Promise<{ data: T[]; count: number }> {
    const queryBuilder = getConnection('mysql-typeorm')
      .getRepository(this.entity)
      .createQueryBuilder('entity');

    const queryFiltered = this.handleCriteria(queryBuilder, criteria);

    const [data, count] = await Promise.all([
      queryFiltered.getMany(),
      queryFiltered.getCount(),
    ]);

    return { data, count };
  }

  async add(data: T): Promise<T> {
    return await getConnection('mysql-typeorm')
      .getRepository(this.entity)
      .save(data);
  }

  async update(newData: T): Promise<T> {
    const oldData = await getConnection('mysql-typeorm')
      .getRepository(this.entity)
      .findOne(newData.id);
    Object.assign(oldData, newData);
    return await getConnection('mysql-typeorm')
      .getRepository(this.entity)
      .save(oldData);
  }

  async remove(id: string): Promise<T> {
    return (await getConnection('mysql-typeorm')
      .getRepository(this.entity)
      .delete(id)) as any;
  }

  private handleCriteria(
    query: SelectQueryBuilder<T>,
    criteria: ICriteria,
  ): SelectQueryBuilder<T> {
    criteria.filters.forEach((filter, idx) => {
      switch (filter.filterOperator) {
        case EFieldOperators.OR_LIKE:
          query.orWhere(
            `${query.alias}.${filter.filterField} LIKE :${filter.filterField}${idx}`,
            {
              [`${filter.filterField}${idx}`]: `%${filter.filterValue}%`,
            },
          );
          break;
        case EFieldOperators.OR_EQUAL:
          query.orWhere(
            `${query.alias}.${filter.filterField} = :${filter.filterField}${idx}`,
            {
              [`${filter.filterField}${idx}`]: `${filter.filterValue}`,
            },
          );
          break;
        case EFieldOperators.AND_LIKE:
          query.andWhere(
            `${query.alias}.${filter.filterField} LIKE :${filter.filterField}${idx}`,
            {
              [`${filter.filterField}${idx}`]: `%${filter.filterValue}%`,
            },
          );
          break;
        case EFieldOperators.AND_EQUAL:
          query.andWhere(
            `${query.alias}.${filter.filterField} = :${filter.filterField}${idx}`,
            {
              [`${filter.filterField}${idx}`]: `${filter.filterValue}`,
            },
          );
          break;
      }
    });
    query.limit(criteria.limit).offset(criteria.offset);

    return query;
  }
}
