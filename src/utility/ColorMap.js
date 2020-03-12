class ColorMap {
  constructor() {
    this.colorMap = {
      red: '#db2828',
      green: '#2c662d',
      lightGrey: '#757575'
    };
  }

  get(colorName) {
    return this.colorMap[colorName];
  }
}

export const colorMap = new ColorMap();
