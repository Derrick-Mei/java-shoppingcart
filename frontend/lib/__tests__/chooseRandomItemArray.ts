import {chooseRandomItemInArray} from "../randomGeneratorMethods";

test("chooseRandomItemInArray does not go out of bounds of array", () => {
  const namesArr = ["John", "Sally", "Hendrik"];
  expect(chooseRandomItemInArray(namesArr)).toBeTruthy();
});
