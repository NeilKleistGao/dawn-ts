import { dawn } from "../src/quasi_quote";

test("calling tsc api", () => {
  let code = dawn.code<number>("2 + 2");
  expect(code.run() === 4);
})

test("parsing test", () => {
  {
    let code = dawn.code<string>(`"abcdefg.substring(2)"`);
    expect(code.run() === "cdefg");
  }
  
  {
    let code = dawn.code<boolean>(`true && (false || true)`);
    expect(code.run());
  }

  {
    let code = dawn.code<null>(`null`);
    expect(code.run() === null);
  }
})
