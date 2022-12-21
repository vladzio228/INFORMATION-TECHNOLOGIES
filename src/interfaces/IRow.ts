import { BaseValue, ICell } from './ICell';

export interface IRow {
  cells: ICell[];

  update: (dict: Record<string, BaseValue>) => this;
  deleteCell: (cellsNames: string[]) => void;
  hasCells: (dict: Record<string, BaseValue>) => boolean;
  hasCell: (cellName: string, cellValue: BaseValue) => boolean;
  findCell: (cellName: string) => number | undefined;
  stringify: () => string;
  dict: () => Record<string, BaseValue>;
  exit: () => void;
}
