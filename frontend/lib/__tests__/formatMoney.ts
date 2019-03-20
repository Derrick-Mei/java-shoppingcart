import {formatMoney} from "../formatMoney";
describe("formatMoney should format the given number with a $ and 2 decimal places", () => {
  test("whole numbers", () => {
    let num = 0;
    expect(formatMoney(num)).toBe("$0.00");

    num = 22;
    expect(formatMoney(num)).toBe("$22.00");
  });
  test("Number with 1 decimal place", () => {
    let num = 0.0;
    expect(formatMoney(num)).toBe("$0.00");

    num = 22.5;
    expect(formatMoney(num)).toBe("$22.50");
  });

  test("Number with 2 decimal places", () => {
    let num = 0.0;
    expect(formatMoney(num)).toBe("$0.00");

    num = 22.53;
    expect(formatMoney(num)).toBe("$22.53");
  });
  test("Number with more than 2 decimal places", () => {
    let num = 0.333333333;
    expect(formatMoney(num)).toBe("$0.33");
  });
});
