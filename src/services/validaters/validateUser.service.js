class StringUtils {
  constructor() {}

  isNilOrEmpty(field) {
    return field === null || field === undefined || field === this.getEmptyString();
  }

  getEmptyString() {
    return '';
  }

  applyTrim(value) {
    return value?.trim();
  }

  isValidRegex(value, regex) {
    const regex = new RegExp(regex);
    const matches = value.match(regex);

    return matches;
  }
}

class ValidateString extends StringUtils {

  constructor(field) {
    super();
    this.field = field;
    this.errors = [];
    this.message = this.getEmptyString();
  }

  /**
   * Sets the field to check.
   * @param {string} field - To validate.
   * @returns 
   */
  setField(field) {
    if (!field) {
      this.errors.push('Field is required');
    }

    this.field = field;

    return this;
  }

  trim() {
    this.field = this.applyTrim(this.field);

    return this;
  }

  setMessage(message) {
    this.message = message;

    return this;
  }

  validWithRegex(regex) {
    if (!this.isValidRegex(this.field, regex)) {
      this.errors.push('Value not match with the specific regex');
    }

    return this;
  }

  isValid() {
    return this.errors.length > 0;
  }

  getErrors() {
    return this.errors;
  }
}

const errors = new ValidateString()
  .setField('hol')
  .trim()
  .setMessage('The field is required')
  .validWithRegex()
  .getErrors();
