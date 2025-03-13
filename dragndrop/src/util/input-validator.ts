type ValidationOptions = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
};

const defaultOpts: ValidationOptions = {
  required: false,
};

abstract class InputValidator {
  static validate(
    value: string | number,
    options: ValidationOptions = defaultOpts
  ) {
    let isValid = true;
    if (options.required && !value) {
      isValid = isValid && false;
    }

    if (typeof value === 'string') {
      if (options.minLength && value.length < options.minLength) {
        isValid &&= false;
      }
      if (options.maxLength && value.length > options.maxLength) {
        isValid &&= false;
      }
    } else {
      if (options.min != null && isNaN(value) && +value < options.min) {
        isValid &&= false;
      }
      if (options.max != null && isNaN(value) && +value > options.max) {
        isValid &&= false;
      }
    }

    return isValid;
  }
}

export default InputValidator;
