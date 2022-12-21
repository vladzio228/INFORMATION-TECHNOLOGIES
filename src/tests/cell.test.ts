import { Cell } from '../services/Cell';

describe('Cell', () => {
  let cell: Cell;

  beforeEach(() => {
    cell = new Cell('A1', 123);
  });

  it('should create a new cell with the correct name and value', () => {
    expect(cell.name).toBe('A1');
    expect(cell.value).toBe(123);
    expect(cell.type).toBe('number');
  });

  it('should update the cell value and type', () => {
    cell.update('abc');
    expect(cell.value).toBe('abc');
    expect(cell.type).toBe('string');
  });

  it('should erase the cell value and set the type to null', () => {
    cell.erase();
    expect(cell.value).toBe(null);
    expect(cell.type).toBe('object');
  });

  it('should update the cell name', () => {
    cell.rename('B2');
    expect(cell.name).toBe('B2');
  });

  it('should return a string representation of the cell', () => {
    expect(cell.stringify()).toBe('A1, 123, number');
  });
});
