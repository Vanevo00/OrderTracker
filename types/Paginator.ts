export interface IPaginator {
    page: number
    size: number
    offset?: number
}

export const DefaultPaginator: IPaginator = {
  page: 1,
  size: 30,
  offset: 0
}
