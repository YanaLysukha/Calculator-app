import Calculator from '.';

describe('calculator module', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = Calculator.getInstance();
        calculator.reset();
    });

    describe('check putNumber method', () => {
        test('should append the number to the internal data', () => {
            calculator.putNumber(3);
            calculator.putOperator('+')
            calculator.putNumber(2);
            expect(calculator.getData()).toBe('3+2');
        });

        test('should work correctly with an empty initial state', () => {
            calculator.putNumber(8);
            expect(calculator.getData()).toBe('8');
        });

        test('should work correctly when entering 0', () => {
            calculator.putNumber(0);
            expect(calculator.getData()).toBe('0');
            calculator.putNumber(3);
            expect(calculator.getData()).toBe('3');
        });
    });

    describe('check putDecimal method', () => {
        test('should append the decimal correctly', () => {
            calculator.putNumber(0);
            calculator.putDecimal();
            calculator.putNumber(2);
            expect(calculator.getData()).toBe('0.2');
        });

        test('should append the decimal correctly #2', () => {
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
        });
    });

    describe('check putOperator method', () => {
        test('should append the operator to the internal data', () => {
            calculator.putNumber(1);
            calculator.putDecimal();
            calculator.putNumber(5);
            calculator.putOperator('-');
            calculator.putNumber(2);
            expect(calculator.getData()).toBe('1.5-2');
        });

        test('should replace operator instead of another', () => {
            calculator.putNumber(2);
            calculator.putOperator('*');
            calculator.putOperator('+');
            calculator.putNumber(5);
            expect(calculator.getData()).toBe('2+5');
        });

        test('should not display operator that is entered after 0 ', () => {
            calculator.putNumber(0);
            calculator.putOperator('+');
            expect(calculator.getData()).toBe('0+');
        })

        test('should not display operator that is entered first ', () => {
            calculator.putOperator('*');
            expect(calculator.getData()).toBe('');
        })
    });

    describe('check invertSign method', () => {
        test('should invert sign correctly', () => {
            calculator.putNumber(23);
            calculator.invertSign();
            calculator.putOperator('*');
            calculator.putNumber(5);
            calculator.invertSign();
            expect(calculator.getData()).toBe('-23*-5');
        })

        test('should invert sign correctly', () => {
            calculator.putNumber(23);
            calculator.putOperator('-');
            calculator.putNumber(-3);
            calculator.invertSign();
            expect(calculator.getData()).toBe('23-3');
            calculator.calculate();
            expect(calculator.getData()).toBe('20');
            calculator.invertSign();
            expect(calculator.getData()).toBe('-20');
        })
    });

    describe('check calculate method', () => {
        test('should calculate result correctly', () => {
            calculator.putNumber(5);
            calculator.putOperator('+');
            calculator.putNumber(2);
            calculator.putOperator('-');
            calculator.putNumber(3);
            calculator.calculate();
            expect(calculator.getData()).toBe('4');
        });

        test('should calculate result correctly', () => {
            calculator.putNumber(5);
            expect(calculator.getData()).toBe('5');
            calculator.putOperator('+');
            expect(calculator.getData()).toBe('5+');
            calculator.putNumber(2);
            expect(calculator.getData()).toBe('5+2');
            calculator.calculate();
            expect(calculator.getData()).toBe('7');
        });

        test('should calculate result correctly considering operator precedence', () => {
            calculator.putNumber(3);
            calculator.putOperator('+');
            calculator.putNumber(5);
            calculator.putOperator('*');
            calculator.putNumber(2);
            calculator.calculate();
            expect(calculator.getData()).toBe('13');
            calculator.putOperator('-');
            calculator.putNumber(2);
            calculator.putOperator('/');
            calculator.putNumber(2);
            calculator.calculate();
            expect(calculator.getData()).toBe('12');
        });

        test('should calculate percent correctly', () => {
            calculator.putNumber(5);
            calculator.putOperator('%');
            calculator.putNumber(10);
            calculator.calculate();
            expect(calculator.getData()).toBe('0.5');
            calculator.putOperator('%');
            calculator.putNumber(8);
            calculator.calculate();
            expect(calculator.getData()).toBe('0.04');
            calculator.reset();
            calculator.putNumber(100);
            calculator.putOperator('%');
            calculator.putNumber(0);
            calculator.calculate();
            expect(calculator.getData()).toBe('0');
        })

        test('should not show something when there is no data', () => {
            calculator.calculate();
            expect(calculator.getData()).toBe('');
        })

        test('should divide correctly', () => {
            calculator.putNumber(5);
            calculator.putOperator('/');
            calculator.putNumber(2);
            calculator.calculate();
            expect(calculator.getData()).toBe('2.5');
        })

        test('should show error message after dividing by zero', () => {
            calculator.putNumber(5);
            calculator.putOperator('/');
            calculator.putNumber(0);
            calculator.calculate();
            expect(calculator.getData()).toBe('Error!');
        })
    });
});
