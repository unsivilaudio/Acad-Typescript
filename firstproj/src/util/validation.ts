// validation logic
export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(validateInput: Validatable) {
    let isValid = true;
    const { value, required, minLength, maxLength, min, max } = validateInput;
    if (required) {
        isValid = isValid && !!value.toString().trim().length;
    }

    if (typeof value === 'string') {
        const strValue = value.toString().trim();
        if (minLength?.toString()) {
            isValid = isValid && strValue.length < minLength;
        }

        if (maxLength) {
            isValid = isValid && strValue.length > maxLength;
        }
    } else {
        if (min?.toString()) {
            isValid = isValid && +value >= min;
            console.log(+value > min);
        }

        if (max) {
            isValid = isValid && +value < max;
        }
    }

    console.log(isValid);
    return isValid;
}
