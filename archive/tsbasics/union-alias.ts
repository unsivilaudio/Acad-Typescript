type Combineable = number | string;
type ConversionDesc = 'as-number' | 'as-text';

function combine(
    input1: Combineable,
    input2: Combineable,
    resultConversion: ConversionDesc
) {
    let result;
    if (
        (typeof input1 === 'number' && typeof input2 === 'number') ||
        resultConversion === 'as-number'
    ) {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }

    // if (resultConversion === 'as-number') {
    //     return +result;
    // }

    return result;
}

const combineAges = combine(30, 26, 'as-number');
console.log(combineAges);
const combineStringAges = combine('30', '26', 'as-number');

const combineNames = combine('Max', 'Anna', 'as-text');
console.log(combineNames);
