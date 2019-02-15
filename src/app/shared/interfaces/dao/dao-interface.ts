export interface DaoInterface<T> {

  findAll(): Array<T> | void;
  find(value: number): T | void;
  findBy(property: string, value: any): Array<T> | void;
  add(): T;
  update(): T;
  remove(): T;
}
