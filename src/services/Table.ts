import { Row } from '@services/Row';
import { ITable } from '@interfaces/ITable';
import { BaseValue } from '@interfaces/ICell';

export class Table implements ITable {
  name;
  rows;
  constructor(name: string, rows: Row[] = []) {
    this.name = name;
    this.rows = [];
    for (const row of rows) {
      this.rows.push(new Row(row.dict()));
    }
  }

  delete(query: Record<string, BaseValue>): void {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].hasCells(query)) {
        delete this.rows[i];
        this.delete(query);
        break;
      }
    }
  }

  exit(): void {
    this.rows = [];
  }

  find(query: Record<string, BaseValue>): Record<string, BaseValue>[] {
    const finded = [];
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].hasCells(query)) {
        finded.push(this.rows[i].dict());
      }
    }
    return finded;
  }

  stringify(): string {
    let string = this.name + '\n';
    for (const row of this.rows) {
      string += row.stringify() + '\n';
    }
    return string;
  }

  update(query: Record<string, BaseValue>, dict: Record<string, BaseValue>): void {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].hasCells(query)) {
        this.rows[i].update(dict);
      }
    }
  }

  write(row: Record<string, BaseValue>): void {
    this.rows.push(new Row(row));
  }
}
