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
        })
    })
})