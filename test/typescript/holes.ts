import * as dawn from "../../src/index";
const expr$ = dawn.expr$;
const stmt$ = dawn.stmt$;
const $ = dawn.$;

let code = expr$(2 + 2);
let code2 = expr$($(code) + 1);
console.log(code2.run());

let code3 = stmt$(() => {
  console.log($(code));
});
code3.run();

// let abc = "abc";
// let code3 = expr$($(abc) + "def");
