export class SubmissionVerdict {
  static ACCEPTED = new SubmissionVerdict('ACCEPTED');
  static COMPILE_ERROR = new SubmissionVerdict('COMPILE_ERROR');
  static TEST_ERROR = new SubmissionVerdict('TEST_ERROR');

  static values = [
    SubmissionVerdict.ACCEPTED,
    SubmissionVerdict.COMPILE_ERROR,
    SubmissionVerdict.TEST_ERROR
  ];

  constructor(name) {
    this.name = name;
  }

  isInstance(obj) {
    return obj.name === this.name;
  }

  static getByName(name) {
    return this.values.find(value => value.name == name);
  }
}
