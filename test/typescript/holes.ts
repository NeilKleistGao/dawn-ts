import * as dawn from "../../src/index";
const $expr = dawn.$expr;
const $stmt = dawn.$stmt;
const $cross = dawn.$cross;
const $ = dawn.$;

let code = $expr(2 + 2);
let code2 = $expr($(code) + 1);
console.log(code2.run());

let code3 = $stmt(() => {
  console.log($(code));
});
code3.run();

function inc(num: dawn.Code<number>): dawn.Code<number> {
  return $expr($(num) + 1);
}
let res = inc($expr(42));
console.log(res.run());

const v = 42;
const neg = $expr(-$cross(v));
console.log(neg.run());
