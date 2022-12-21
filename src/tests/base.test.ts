import { Table } from '../services/Table';
import { Row } from '../services/Row';
import { Base } from '../services/Base';

describe('Base', () => {
  it('should correctly project the original table', () => {
    const originalTable = new Table('Original Table');
    originalTable.rows = [new Row({ name: 'Alice', age: 5 }), new Row({ name: 'Bob', age: 8 }), new Row({ name: 'Vlad', age: 8 })];

    const base = new Base('Test Base');
    base.table = originalTable;

    const projectedTable = base.projection(['age']);
    expect(projectedTable.rows).toEqual([new Row({ age: 5 }), new Row({ age: 8 })]);
  });
});
