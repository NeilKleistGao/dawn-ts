import * as ts from "typescript";
import {dawn} from "./transformer";

export class Code<T> {
  private m_js: Function | undefined = undefined;
  private m_root: ts.Node;

  constructor(p_ast: ts.Node, p_js: string | undefined) {
    this.m_root = p_ast;
    if (p_js !== undefined) {
      this.m_js = new Function(p_js);
    }
  }

  run(): T | never {
    if (this.m_js === undefined) {
      throw new Error("the node could not be run.");
    }
    else {
      return this.m_js() as T;
    }
  }

  match(pattern: Code<T>): null {
    return null; // TODO:
  }
}

export declare function code$<T>(code: T): Code<T>;

export default(p_program: ts.Program): ts.TransformerFactory<ts.Node> =>
  (p_ctx) => {
    const checker = p_program.getTypeChecker();
    const transformer = new dawn.QuasiQuotationTransformer(p_ctx, checker);
    return (p_sf) => {
      return transformer.run(p_sf as ts.SourceFile);
    };
  }
