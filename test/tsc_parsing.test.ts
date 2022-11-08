import { dawn } from "../src/quasi_quote";

test("calling tsc api", () => {
  dawn.code("2 + 2");
})
  

