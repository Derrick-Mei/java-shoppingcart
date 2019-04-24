import {generateRandomNumByRange} from "../randomGeneratorMethods";

test("generateRandomNumByRange to see if it stays in number range", () => {
  const num = generateRandomNumByRange(0, 3);
  expect(num).toBeGreaterThanOrEqual(0);
  expect(num).toBeLessThanOrEqual(3);

  const num2 = generateRandomNumByRange(5, 8);

  expect(num2).toBeGreaterThanOrEqual(5);
  expect(num2).toBeLessThanOrEqual(8);
});
