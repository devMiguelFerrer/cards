export interface IFilter {
  readonly filterField: string;
  readonly filterOperator: string;
  readonly filterValue: any;
}

export interface ICriteria {
  filters: IFilter[];
  offset: number;
  limit: number;
}
