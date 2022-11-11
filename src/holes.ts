import * as ts from "typescript";
import {dawn as utils} from "./utils";

export namespace dawn {
  export const APPLIED_KEYWORD = "$";
  export const UNAPPLIED_KEYWORD = "$_";

  export class HoleTransformer {
    private m_context: ts.TransformationContext;
    private m_checker: ts.TypeChecker;
    private m_visitor: ts.Visitor;

    constructor(p_context: ts.TransformationContext, p_checker: ts.TypeChecker) {
      this.m_context = p_context;
      this.m_checker = p_checker;
      this.m_visitor = this.visit.bind(this);
    }

    run(p_source_file: ts.SourceFile): ts.SourceFile {
      if (p_source_file.isDeclarationFile) return p_source_file;
      const statements: ts.Statement[] = [];
  
      for (const s of p_source_file.statements) {
        const res = this.visit(s) as ts.Statement[] | ts.Statement | undefined;
        if (res !== undefined) {
          if (Array.isArray(res)) {
            statements.push(...res);
          }
          else {
            statements.push(res);
          }
        }
      }
  
      return ts.factory.updateSourceFile(p_source_file, statements);
    }

    private visit(p_node: ts.Node): ts.VisitResult<ts.Node> {
      if (ts.isCallExpression(p_node)) {
        if (ts.isIdentifier(p_node.expression)) {
          const call_name = p_node.expression.escapedText.toString();
          if (call_name === APPLIED_KEYWORD || call_name === UNAPPLIED_KEYWORD) {
            if (p_node.arguments === undefined || p_node.arguments.length !== 1) {
              throw utils.throwQuoteError(p_node, "unquotation takes one argument.");
            }

            const arg = p_node.arguments[0];
            if (!ts.isIdentifier(arg)) {
              throw utils.throwQuoteError(p_node, "quasi-quotation should be bound with a variable.");
            }

            return ts.factory.createCallExpression(ts.factory.createPropertyAccessExpression(
                ts.factory.createIdentifier(`__dawn__${arg.getText()}`),
                ts.factory.createIdentifier("run")
              ), undefined, undefined); // TODO: apply true AST
          }
        }
      }

      return ts.visitEachChild(p_node, this.m_visitor, this.m_context);
    }
  }
} // namespace dawn
