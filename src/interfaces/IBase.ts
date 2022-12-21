import { ITable } from './ITable';
import { Table } from '@services/Table';

export interface IBase {
  name: string;
  tables: ITable[];

  create: (name: string) => void;
  activate: (name: string) => void;
  delete: (name: string) => void;
  save: () => void;
  load: () => void;
  stringify: () => string;
  projection: (attributes: string[]) => Table;
}
