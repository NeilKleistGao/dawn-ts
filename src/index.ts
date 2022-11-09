import * as ts from "typescript";
import {dawn as core} from "./quasi_quote";
import {dawn} from "./transformer";

export declare function code$<T>(code: string | TemplateStringsArray): core.Code<T>;

export default(p_program: ts.Program): ts.TransformerFactory<ts.Node> =>
  (p_ctx) => {
    const checker = p_program.getTypeChecker();
    const transformer = new dawn.QuasiQuotationTransformer(p_ctx, checker);
    return (p_sf) => {
      return transformer.run(p_sf as ts.SourceFile);
    };
  }
