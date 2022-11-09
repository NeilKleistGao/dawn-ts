import * as ts from "typescript";

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
      return ts.visitEachChild(p_node, this.m_visitor, this.m_context);
    }
  }
} // namespace dawn
