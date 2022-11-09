import { code$ } from "../../src/index";

let code = code$<number>(`2 + 2`);
let v4: number = code.run();
console.log(v4);
