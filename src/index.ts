import * as ts from "typescript";
import {dawn as core} from "./quasi_quote";
import {dawn} from "./transformer";

export class Code<T> {
  constructor() {
  }

  run(): T | never {
    throw new Error("the node could not be run.");
  }

  match(pattern: Code<T>): null {
    return null; // TODO:
  }
}

export declare function code$<T>(code: string | TemplateStringsArray): Code<T>;

export default(p_program: ts.Program): ts.TransformerFactory<ts.Node> =>
  (p_ctx) => {
    const checker = p_program.getTypeChecker();
    const transformer = new dawn.QuasiQuotationTransformer(p_ctx, checker);
    return (p_sf) => {
      return transformer.run(p_sf as ts.SourceFile);
    };
  }
