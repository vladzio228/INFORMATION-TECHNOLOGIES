import { IRow } from '@interfaces/IRow';
import { BaseValue } from '@interfaces/ICell';
import { Cell } from '@services/Cell';

export class Row implements IRow {
  cells;
  constructor(dict: Record<string, BaseValue>) {
    this.cells = [];
    for (const key in dict) {
      this.cells.push(new Cell(key, dict[key]));
    }
  }

  deleteCell(cellsNames: string[]): void {
    for (const cellsName of cellsNames) {
      const findedIndex = this.findCell(cellsName);
      console.log(findedIndex, 'findedIndex');
      if (typeof findedIndex === 'number') {
        this.cells = this.cells.filter((cell, index) => index !== findedIndex);
      }
    }
    this.cells = this.cells.filter(Boolean);
  }

  dict(): Record<string, BaseValue> {
    const dict: Record<string, BaseValue> = {};
    for (const cell of this.cells) {
      dict[cell.name] = cell.value;
    }
    return dict;
  }

  exit(): void {
    this.cells = [];
  }

  findCell(cellName: string): number | undefined {
    const index = this.cells.findIndex(cell => cell.name === cellName);
    return index >= 0 ? index : undefined;
  }

  hasCell(cellName: string, cellValue: BaseValue): boolean {
    return Boolean(this.cells.find(cell => cell.name === cellName && cell.value === cellValue));
  }

  hasCells(dict: Record<string, BaseValue>): boolean {
    for (const dictKey in dict) {
      if (!this.hasCell(dictKey, dict[dictKey])) {
        return false;
      }
    }
    return true;
  }

  stringify(): string {
    return this.cells.map(cell => `[${cell.stringify()}], `).join('');
  }

  update(dict: Record<string, BaseValue>): this {
    for (const key in dict) {
      const findedIndex = this.findCell(key);
      if (typeof findedIndex === 'number') {
        this.cells[findedIndex].update(dict[key]);
      } else {
        this.cells.push(new Cell(key, dict[key]));
      }
    }
    return this;
  }
}
