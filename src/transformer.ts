import * as ts from "typescript";
import {dawn as utils} from "./utils";

export namespace dawn {
  export class QuasiQuotationTransformer {
    private m_context: ts.TransformationContext;
    private m_checker: ts.TypeChecker;
    private m_visitor: ts.Visitor;
  
    constructor(p_context: ts.TransformationContext, p_checker: ts.TypeChecker) {
      this.m_context = p_context;
      this.m_checker = p_checker;
      this.m_visitor = this.visit.bind(this);
    }
  
    run(p_source_file: ts.SourceFile): ts.Node {
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
          if (p_node.expression.escapedText === "code$") {
            if (p_node.arguments === undefined || p_node.arguments.length !== 1) {
              throw utils.throwQuoteError(p_node, "quasi-quotation takes one argument.");
            }

            if (p_node.typeArguments === undefined || p_node.typeArguments.length !== 1) {
              throw utils.throwQuoteError(p_node, "quasi-quotation takes one type argument.");
            }

            const arg = p_node.arguments[0];
            const type_arg = p_node.typeArguments[0];
            if (ts.isStringLiteralLike(arg)) {
              let js = "";
              const program = createProgram(arg.text, (p_content: string) => {js = p_content;});
              program.emit();

              return ts.factory.createCallExpression(
                ts.factory.createParenthesizedExpression(
                  ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined,
                    ts.factory.createBlock([
                      ts.factory.createReturnStatement(
                        ts.factory.createNewExpression(ts.factory.createIdentifier("dawn.Code"), [type_arg], [
                          ts.factory.createNull(), // TODO:
                          ts.factory.createStringLiteral("return "+  js) // TODO:
                        ])
                      )
                    ], false)
                  )
                ), undefined, undefined
              );
            }
            else if (ts.isTemplateExpression(arg)) {
              // TODO:

              return ts.factory.createCallExpression(
                ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined,
                  ts.factory.createBlock([], false)), undefined, undefined
              );
            }
            else {
              throw utils.throwQuoteError(p_node, "the argument of quasi-quotation should be string or TemplateStringsArray.");
            }
          }
        }
      }

      return ts.visitEachChild(p_node, this.m_visitor, this.m_context);
    }
  }

  function createProgram(p_code: string, p_save: (p_content: string) => void = (p_content: string) => {p_content;}): ts.Program {
    const options = {
      "target": ts.ScriptTarget.ES2016,
      "module": ts.ModuleKind.CommonJS
    };

    let compiler_host = ts.createCompilerHost(options);
      compiler_host.readFile =
        (p_filename: string) => { p_filename; return p_code; };
      compiler_host.writeFile =
        (p_filename: string, p_content: string) => { p_filename; p_save(p_content); };

    const program = ts.createProgram(["code.ts"], options, compiler_host);
    return program;
  }
} // namespace dawn
