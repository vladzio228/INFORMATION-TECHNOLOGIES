import { Base } from '@services/Base';
import { Row } from '@services/Row';
import { Table } from '@services/Table';

export const run = () => {
  const base = new Base('dataBase', ['test1', 'test2']);
  base.activate('test1');
  base.table?.write({ firstName: 'Vlad', lastName: 'Petriv', age: 20 });
  base.table?.write({ firstName: 'Vlad', lastName: 'sfsfas', age: 21230 });

  console.log(base.table?.stringify());

  base.activate('test2');
  base.table?.write({ firstName: 'Peter', lastName: 'Petrov', age: 20 });
  base.table?.write({ firstName: 'Peter', lastName: 'mi', age: 3 });

  console.log(base.table?.stringify());

  base.delete('test1');
  console.log(base.table?.stringify());

  base.save();
};

export const projectionRunner = () => {
  console.log('PROJECTION RUNNER');
  const originalTable = new Table('Original Table');
  originalTable.rows = [new Row({ name: 'Alice', age: 5 }), new Row({ name: 'Bob', age: 8 }), new Row({ name: 'Vlad', age: 8 })];

  const base = new Base('Test Base');
  base.table = originalTable;

  const projectedTable = base.projection(['age']);

  console.log(projectedTable.stringify());
};
