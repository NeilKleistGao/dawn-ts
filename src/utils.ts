import * as ts from "typescript";

export namespace dawn {
  export function throwQuoteError(p_node: ts.Node, p_msg: string): never {
    if (ts.sys === undefined || typeof(process) !== "object") {
      throw new Error(p_msg);
    }
    else {
      console.error(ts.formatDiagnosticsWithColorAndContext([{
        category: ts.DiagnosticCategory.Error,
        code: 3154,
        file: p_node.getSourceFile(),
        start: p_node.pos,
        length: p_node.end - p_node.pos,
        messageText: p_msg
      }], {
        getNewLine: () => '\n',
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getCanonicalFileName: (p_filename) => p_filename
      }));
    }

    process.exit();
  }

} // namespace dawn
