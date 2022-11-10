// import { code$, Code } from "../../src/index";
import * as dawn from "../../src/index";
const code$ = dawn.code$;

let code = code$<number>(`2 + 2`);
let v4: number = code.run();
console.log(v4);
