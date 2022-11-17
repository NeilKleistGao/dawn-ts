import * as ts from "typescript";
import { Code } from ".";

export namespace dawn {
  export class QuasiAST {
    private readonly m_range: [number, number];
    private readonly m_kind: ts.SyntaxKind;
    private readonly m_children: QuasiAST[];
    private readonly m_is_hole: boolean;

    constructor(p_kind: ts.SyntaxKind, p_range: [number, number], p_children: QuasiAST[], p_is_hole: boolean) {
      this.m_kind = p_kind;
      this.m_range = p_range;
      this.m_children = p_children;
      this.m_is_hole = p_is_hole;
    }

    match(p_other: QuasiAST): boolean {
      return false; // TODO:
    }

    extract<T>(p_js: string): Code<T> {
      return new Code<T>(this, p_js, new Map<string, Code<unknown>>()); // TODO:
    }
  }
} // namespace dawn
