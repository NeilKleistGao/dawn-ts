import * as ts from "typescript";
import * as tts from "ttypescript";
import {dawn as utils} from "./utils";
import {dawn as holes} from "./holes";

export namespace dawn {
  const EXPRESSION_KEYWORD = "$expr";
  const STATEMENT_KEYWORD = "$stmt";
  const DIAGNOTICS_REG = /^Cannot find name (')(\w+)('|").$/;
  const SOURCE_FILE_NAME = "code.ts";

  const OPTIONS = {
    "target": ts.ScriptTarget.ES2016,
    "module": ts.ModuleKind.CommonJS,
  };

  type QuotationData = [null, string]; // TODO:

  export class QuasiQuotationTransformer {
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
          if (call_name === EXPRESSION_KEYWORD || call_name === STATEMENT_KEYWORD) {
            if (p_node.arguments === undefined || p_node.arguments.length !== 1) {
              throw utils.throwQuoteError(p_node, "quasi-quotation takes one argument.");
            }

            const arg = p_node.arguments[0];

            let ref_array: ts.Expression =
              ts.factory.createNewExpression(ts.factory.createIdentifier("Map"), undefined, []);
            function emit(p_program: string): QuotationData {
              let js = "";
              let hole_names = new Set<String>();

              const sub_program = createSubProgram(p_program, (p_content: string) => { js = p_content; });
              const transformer: ts.TransformerFactory<ts.SourceFile> = (p_ctx) => {
                const checker = sub_program.getTypeChecker();
                const transformer = new holes.HoleTransformer(p_ctx, checker);
                return (p_sf) => {
                  const res = transformer.run(p_sf as ts.SourceFile);
                  hole_names = transformer.getHoleNames();
                  return res;
                };
              }

              sub_program.emit(undefined, undefined, undefined, undefined, { after: [transformer] });
              const diagnotics = sub_program.getSemanticDiagnostics(sub_program.getSourceFile(SOURCE_FILE_NAME));
              for (const diag of diagnotics) {
                if (diag.code === 2304) {
                  const match_array = DIAGNOTICS_REG.exec(diag.messageText.toString());
                  if (match_array !== null) {
                    const name = match_array[2].toString();
                    if (!hole_names.has(name)) {
                      throw utils.throwQuoteError(p_node, `can not find code variable '${name}'.`);
                    }
                  }
                }
              }

              if (hole_names.size > 0) {
                const pairs: ts.Expression[] = [];
                for (const name of hole_names) {
                  pairs.push(
                    ts.factory.createArrayLiteralExpression([
                      ts.factory.createStringLiteral(name.toString()),
                      ts.factory.createIdentifier(name.toString())
                    ])
                  );
                }

                ref_array =
                  ts.factory.createNewExpression(ts.factory.createIdentifier("Map"), undefined,
                  [ts.factory.createArrayLiteralExpression(pairs)]);
              }

              return [null, js]; // TODO:
            }

            if (call_name === EXPRESSION_KEYWORD) {
              const res = emit(arg.getText());
              return createCodeExpression(res[0], `return ${res[1]}`, ref_array);
            }
            else {
              if (ts.isArrowFunction(arg)) {
                const res = emit(arg.body.getText());
              return createCodeExpression(res[0], res[1], ref_array);
              }
              else {
                throw utils.throwQuoteError(p_node, "quasi-quotation statements only accept arrow functions.");
              }
            }
          }
          else if (call_name === holes.APPLIED_KEYWORD ||
                   call_name === holes.UNAPPLIED_KEYWORD ||
                   call_name === holes.CROSS_KEYWORD) {
            throw utils.throwQuoteError(p_node, "'$cross', '$' and '$_' should be used in a quasi-quotation.");
          }
        }
      }
      

      return ts.visitEachChild(p_node, this.m_visitor, this.m_context);
    }
  }

  function createSubProgram(p_code: string, p_save: (p_content: string) => void = (p_content: string) => {p_content;}): ts.Program {
    let compiler_host = tts.createCompilerHost(OPTIONS);
      compiler_host.readFile =
        (p_filename: string) => { p_filename; return p_code; };
      compiler_host.writeFile =
        (p_filename: string, p_content: string) => { p_filename; p_save(p_content); };

    const program = tts.createProgram([SOURCE_FILE_NAME], OPTIONS, compiler_host);
    return program;
  }

  function createCodeExpression(p_node: null, p_js: string, p_params: ts.Expression): ts.CallExpression {
    return ts.factory.createCallExpression(
      ts.factory.createParenthesizedExpression(
        ts.factory.createArrowFunction(undefined, undefined, [], undefined, undefined,
          ts.factory.createBlock([
            ts.factory.createReturnStatement(
              ts.factory.createNewExpression(ts.factory.createIdentifier("dawn.Code"), [], [
                ts.factory.createNull(), // TODO:
                ts.factory.createStringLiteral(p_js),
                p_params
              ])
            )
          ], false)
        )
      ), undefined, undefined
    );
  }
} // namespace dawn
