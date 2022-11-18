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

  const CREATE_AST_HANDLER = ts.factory.createIdentifier("dawn.createAST");
  export function translate(p_node: ts.Node): ts.Expression {
    const children_list: ts.Expression[] = [];
    const children = p_node.getChildren();
    for (let child of children) {
      if (child.kind !== ts.SyntaxKind.EndOfFileToken) {
        children_list.push(translate(child));
      }
    }

    return ts.factory.createCallExpression(
      CREATE_AST_HANDLER, undefined, [
        ts.factory.createNumericLiteral(p_node.kind as number),
        ts.factory.createArrayLiteralExpression([
          ts.factory.createNumericLiteral(p_node.pos),
          ts.factory.createNumericLiteral(p_node.end)
        ]),
        ts.factory.createArrayLiteralExpression(children_list),
        ts.factory.createFalse() // TODO: check holes.
      ]
    );
  }
} // namespace dawn
