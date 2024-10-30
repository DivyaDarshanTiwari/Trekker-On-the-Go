class MySet {
  constructor() {
    this.students = {};
    this.count = 0;
  }

  add(value) {
    const key = this._getKey(value);
    if (!this.students[key]) {
      this.students[key] = value;
      this.count++;
    }
  }

  delete(value) {
    const key = this._getKey(value);
    if (this.students[key]) {
      delete this.students[key];
      this.count--;
    }
  }

  has(value) {
    const key = this._getKey(value);
    return !!this.students[key];
  }

  size() {
    return this.count;
  }

  forEach(callback) {
    Object.values(this.students).forEach(callback);
  }

  _getKey(value) {
    return value === Object(value) ? JSON.stringify(value) : value;
  }
}

module.exports = MySet;
