import { ICriteria, IFilter } from '../Domain/ICriteria';

export class CriteriaFormatted implements ICriteria {
  readonly offset: number;
  readonly limit: number;
  readonly filters: IFilter[];

  constructor(query: { criteria: string }) {
    const decodedFilters = this.decodedFilter(query.criteria);
    this.offset =
      decodedFilters.offset &&
      !Number.isNaN(parseInt(decodedFilters.offset, 10))
        ? parseInt(decodedFilters.offset, 10)
        : 0;
    this.limit =
      decodedFilters.limit && !Number.isNaN(parseInt(decodedFilters.limit, 10))
        ? parseInt(decodedFilters.limit, 10)
        : 10;
    this.filters =
      decodedFilters.filters && Array.isArray(decodedFilters.filters)
        ? [...decodedFilters.filters]
        : [];
  }

  private decodedFilter(encodedFilters: string): {
    offset: string;
    limit: string;
    filters: [];
  } {
    try {
      return JSON.parse(decodeURI(encodedFilters));
    } catch (error) {
      return { offset: '0', limit: '10', filters: [] };
    }
  }
}
