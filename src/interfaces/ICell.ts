export type BaseValue = string | number | bigint | boolean | Date | null;

export interface ICell {
  name: string;
  value: BaseValue;
  type: BaseValue;

  update: (value: BaseValue) => this;
  erase: () => this;
  rename: (name: string) => this;
  stringify: () => string;
}
