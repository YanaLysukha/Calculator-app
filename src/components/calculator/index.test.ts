import Calculator from ".";

describe('calculator module', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = Calculator.getInstance();
        calculator.reset();
    });

    describe('check putNumber method', () => {
        test('should append the number to the internal data', () => {
            calculator.putNumber(3);
            calculator.putNumber(2);
            expect(calculator.getData()).toBe('32');
        });

        test('should work correctly with an empty initial state', () => {
            calculator.putNumber(8);
            expect(calculator.getData()).toBe('8');
        });

        test('should work correctly when entering 0', () => {
            calculator.putNumber(0);
            calculator.putNumber(3);
            expect(calculator.getData()).toBe('3');
        })
    });

    describe('check putDecimal method', () => {
        test('should append the decimal correctly', () => {
            calculator.putNumber(0);
            calculator.putDecimal();
            calculator.putNumber(2);
            expect(calculator.getData()).toBe('0.2');
        });

        test('should not append several decimals in row', () => {
            calculator.putNumber(1);
            calculator.putDecimal();
            calculator.putDecimal();
            calculator.putDecimal();
            calculator.putNumber(2);
            expect(calculator.getData()).toBe('1.2');
        })
    });

    describe('check putOperator method', () => {
        test('should append the operator to the internal data', () => {
            calculator.putNumber(1);
            calculator.putDecimal();
            calculator.putNumber(5);
            calculator.putOperator('-');
            calculator.putNumber(2);
            expect(calculator.getData()).toBe('1.5-2');
        })

        test('should replace operator instead of another', () => {
            calculator.putNumber(2);
            calculator.putOperator('*');
            calculator.putOperator('+');
            calculator.putNumber(5);
            expect(calculator.getData()).toBe('2+5');
        })
    });

    // describe('check invertSign method', () => {
    //     test('should invert sign correctly', () => {
    //         calculator.putNumber(23);
    //         calculator.putOperator('+')
    //     })
    // })
})