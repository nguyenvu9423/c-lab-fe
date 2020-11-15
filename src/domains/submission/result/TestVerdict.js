export class TestVerdict {
  static AC = new TestVerdict('AC', 'Accepted');
  static WA = new TestVerdict('WA', 'Wrong answer');
  static TLE = new TestVerdict('TLE', 'TLE');
  static MLE = new TestVerdict('MLE', 'MLE');
  static OLE = new TestVerdict('OLE', 'OLE');
  static RE = new TestVerdict('RE', 'Runtime error');

  static values = [
    TestVerdict.AC,
    TestVerdict.WA,
    TestVerdict.TLE,
    TestVerdict.MLE,
    TestVerdict.OLE,
    TestVerdict.RE
  ];

  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  static valueOf(obj) {
    return TestVerdict.values.find(verdict => verdict.name == obj.name);
  }

  static getByName(name) {
    return TestVerdict.values.find(verdict => verdict.name == name);
  }
}
