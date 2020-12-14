import { ISorting } from '../../types/Sorting'

export default (sorting: ISorting) => {
  const {
    key,
    order
  } = sorting

  return { [key]: order }
}
