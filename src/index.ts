import * as ts from "typescript";
import {dawn} from "./transformer";

export class Code<T> {
  private m_func: Function;
  private m_root: ts.Node;
  private m_params: Map<string, Code<unknown>>;

  constructor(p_ast: ts.Node, p_js: string, p_params: Map<string, Code<unknown>>) {
    this.m_root = p_ast;
    this.m_params = p_params;
    this.m_func = new Function("p_ref", p_js);
  }

  run(): T {
    return this.m_func(this.m_params) as T;
  }

  match(pattern: Code<T>): null {
    return null; // TODO:
  }
}

export declare function expr$<T>(p_code: T): Code<T>;
export declare function stmt$(p_code: ()=>void): Code<void>;
export declare function cross$<T>(p_variable: T): T;
export declare function $<T>(p_code: Code<T>): T;
export declare function $_<T>(p_name: string): T; // TODO: pattern matching
export declare function $$<T>(p_name: string): T; // TODO: context

export default(p_program: ts.Program): ts.TransformerFactory<ts.Node> =>
  (p_ctx) => {
    const checker = p_program.getTypeChecker();
    const transformer = new dawn.QuasiQuotationTransformer(p_ctx, checker);
    return (p_sf) => {
      return transformer.run(p_sf as ts.SourceFile);
    };
  }
