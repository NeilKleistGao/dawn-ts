import { dawn } from "../src/quasi_quote";

test("calling tsc api", () => {
  let code = dawn.code<number>("2 + 2");
  expect(code.run() === 4);
})

test("parsing test", () => {
  {
    let code = dawn.code<string>(`"return abcdefg.substring(2)"`);
    expect(code.run() === "cdefg");
  }
  
  {
    let code = dawn.code<boolean>(`return true && (false || true)`);
    expect(code.run());
  }

  {
    let code = dawn.code<null>(`return null`);
    expect(code.run() === null);
  }

  {
    let code = dawn.code<{a: 42}>(`return ({a: 42})`);
    expect(code.run().a === 42);
  }

  {
    let code = dawn.code<(x: number) => number>(`return (x: number) => return x + 1`);
    let inc:(x: number) => number = code.run();
    expect(inc(42) === 43);
  }

  {
    let code = dawn.code<void>(`const a = 42;`);
    code.run();
  }

  {
    let code = dawn.code<void>(`if (true) { console.log("hello"); }`);
    code.run();
  }
})
