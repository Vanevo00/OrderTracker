export interface ISorting {
    key: string
    order?: Order
}

enum Order {
    DESC = -1,
    ASC = 1
}

export const DefaultSorting: ISorting = {
  key: 'created',
  order: Order.DESC
}
