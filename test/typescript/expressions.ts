import * as dawn from "../../src/index";
const code$ = dawn.code$;

let code = code$(2 + 2);
let v4: number = code.run();
console.log(v4);

let code2 = code$("abcdefg".substring(2));
let str = code2.run();
console.log(str);
