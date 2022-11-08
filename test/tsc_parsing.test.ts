import { dawn } from "../src/quasi_quote";

test("calling tsc api", () => {
  let code = dawn.code<number>("2 + 2");
  expect(code.run() === 4);
})
  