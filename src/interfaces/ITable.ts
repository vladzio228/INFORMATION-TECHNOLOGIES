import { IRow } from './IRow';
import { BaseValue } from './ICell';

export interface ITable {
  name: string;
  rows: IRow[];

  write: (row: Record<string, BaseValue>) => void;
  update: (query: Record<string, BaseValue>, dict: Record<string, BaseValue>) => void;
  delete: (query: Record<string, BaseValue>) => void;
  find: (query: Record<string, BaseValue>) => Record<string, BaseValue>[];
  stringify: () => string;
  exit: () => void;
}
