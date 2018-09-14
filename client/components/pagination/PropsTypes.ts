export default interface PaginationTypes {
  total?: number;
  pageSize?: number;
  current?: number;
  onChange?: (value: number) => void;
}
