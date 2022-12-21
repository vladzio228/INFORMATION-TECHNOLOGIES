import { Row } from '../services/Row';

describe('Row', () => {
  let row: Row;
  const cells = { A: 1, B: 2, C: 3 };

  beforeEach(() => {
    row = new Row(cells);
  });

  it('should create a new row with the correct cells', () => {
    expect(row.cells).toHaveLength(3);
    for (const cell of row.cells) {
      expect(cell.name).toBeDefined();
      expect(cell.value).toBeDefined();
      expect(cells[cell.name]).toEqual(cell.value);
    }
  });

  it('should delete the specified cells', () => {
    row.deleteCell(['A', 'C']);
    expect(row.cells).toHaveLength(1);
    expect(row.cells[0].name).toBe('B');
    expect(row.cells[0].value).toBe(2);
  });

  it('should return the cells as a dictionary', () => {
    expect(row.dict()).toEqual(cells);
  });

  it('should empty the row', () => {
    row.exit();
    expect(row.cells).toHaveLength(0);
  });

  it('should find the index of a cell by name', () => {
    expect(row.findCell('A')).toBe(0);
    expect(row.findCell('B')).toBe(1);
    expect(row.findCell('C')).toBe(2);
    expect(row.findCell('D')).toBeUndefined();
  });

  it('should check if the row has a cell with the specified name and value', () => {
    expect(row.hasCell('A', 1)).toBe(true);
    expect(row.hasCell('A', 2)).toBe(false);
    expect(row.hasCell('D', 2)).toBe(false);
  });

  it('should check if the row has all the cells in the specified dictionary', () => {
    expect(row.hasCells({ A: 1, B: 2, C: 3 })).toBe(true);
    expect(row.hasCells({ A: 1, B: 2, C: 4 })).toBe(false);
    expect(row.hasCells({ A: 1, B: 2, C: 3, D: 4 })).toBe(false);
  });

  it('should return a string representation of the row', () => {
    expect(row.stringify()).toBe('[A, 1, number], [B, 2, number], [C, 3, number], ');
  });

  it('should update the cells in the row', () => {
    row.update({ A: 4, D: 5 });
    expect(row.cells).toHaveLength(4);
    expect(row.cells[0].value).toBe(4);
    expect(row.cells[3].name).toBe('D');
    expect(row.cells[3].value).toBe(5);
  });
});
