import { BaseValue, ICell } from '@interfaces/ICell';

export class Cell implements ICell {
  name;
  value;
  type;

  constructor(name: string, value: BaseValue) {
    this.name = name;
    this.value = value;
    this.type = typeof value;
  }

  update(value: BaseValue) {
    this.value = value;
    this.type = typeof value;
    return this;
  }

  erase() {
    this.value = null;
    this.type = typeof null;
    return this;
  }

  rename(name: string) {
    this.name = name;
    return this;
  }

  stringify() {
    return [this.name, this.value, this.type].join(', ');
  }
}
