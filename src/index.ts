import * as ts from "typescript";
import {dawn} from "./transformer";
import {dawn as ast} from "./ast";

export class Code<T> {
  private m_func: Function;
  private m_root: ast.QuasiAST;
  private m_params: Map<string, Code<unknown>>;

  constructor(p_ast: ast.QuasiAST, p_js: string, p_params: Map<string, Code<unknown>>) {
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

export function createAST(p_kind: ts.SyntaxKind, p_range: [number, number], p_children: ast.QuasiAST[], p_is_hole: boolean) {
  return new ast.QuasiAST(p_kind, p_range, p_children, p_is_hole);
}

export declare function $expr<T>(p_code: T): Code<T>;
export declare function $stmt(p_code: ()=>void): Code<void>;
export declare function $cross<T>(p_variable: T): T;
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
