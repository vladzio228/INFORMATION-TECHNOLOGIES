import { IBase } from '@interfaces/IBase';
import { Table } from '@services/Table';
import { Row } from '@services/Row';
import * as fs from 'fs';
import path from 'path';

export class Base implements IBase {
  name;
  tables;
  table;
  constructor(name: string, names: string[] = []) {
    this.name = name;
    this.tables = [];
    for (const tableName of names) {
      this.tables.push(new Table(tableName));
    }
    if (this.tables.length > 0) {
      this.table = this.tables[0];
    }
  }
  activate(name: string): void {
    const tableToActivate = this.tables.find(table => table.name === name);
    if (tableToActivate) {
      this.table = tableToActivate;
    }
  }

  create(name: string): void {
    this.tables.push(new Table(name));
  }

  delete(name: string): void {
    for (let i = 0; i < this.tables.length; i++) {
      if (this.tables[i].name === name) {
        delete this.tables[i];
        this.table = this.tables[0];
        break;
      }
    }
  }
  projection(attributes: string[]): Table {
    const projectedTable = new Table(`Projection of ${this.table.name}`);
    const projectedRowsSet = new Set<Row>();
    this.table?.rows.forEach(row => {
      const projectedRow = new Row({});
      attributes.forEach(attribute => {
        projectedRow.update({ [attribute]: row.dict()[attribute] });
      });
      const rowString = JSON.stringify(projectedRow);
      let isDuplicate = false;
      projectedRowsSet.forEach(setRow => {
        if (JSON.stringify(setRow) === rowString) {
          isDuplicate = true;
        }
      });
      if (!isDuplicate) {
        projectedRowsSet.add(projectedRow);
      }
    });
    projectedTable.rows = [...projectedRowsSet];
    return projectedTable;
  }

  load(): void {
    const basePath = 'src/files/';
    const fullPath = path.resolve(basePath + this.name + '.txt');

    const newData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    this.name = newData.name;
    this.tables = newData.tables;
    this.table = newData.table;
  }

  save(): void {
    const basePath = 'src/files/';
    const fullPath = path.resolve(basePath + this.name + '.txt');

    try {
      const stream = fs.createWriteStream(fullPath, 'utf-8');
      stream.on('ready', () => {
        const newData = JSON.stringify(this, null, '\t');
        fs.writeFileSync(fullPath, newData, 'utf-8');
      });
    } catch (err) {
      throw err;
    }
  }

  stringify(): string {
    let string = '----------------------\n';
    for (const table of this.tables) {
      string += table.stringify();
    }
    return string;
  }
}
