class ArrayUtils {
  static isEmpty(arr) {
    return !arr || arr.length === 0;
  }

  static isNotEmpty(arr) {
    return !this.isEmpty(arr);
  }
}

export const Comparators = {
  byIdDesc: (a, b) => b.id - a.id,
};

export default ArrayUtils;
