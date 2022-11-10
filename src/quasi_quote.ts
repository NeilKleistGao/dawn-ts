import * as ts from "typescript";

export namespace dawn {
  interface MatchingResult {}

  export class Code<T> {
    private static s_options = {
      "target": ts.ScriptTarget.ES2016,
      "module": ts.ModuleKind.CommonJS
    };

    // private m_program: ts.Program;
    // private m_js: string | undefined = undefined;
    // private m_function: Function | undefined = undefined;

    constructor() {
    }

    run(): T | never {
      // if (this.m_function === undefined) {
      //   this.m_program.emit();
      //   const js = this.m_js as string;
      //   this.m_function = new Function(js);
      // }

      // return (this.m_function as Function)() as T;
      throw new Error("the node could not be run.");
    }

    match(pattern: Code<T>): MatchingResult | null {
      return null; // TODO:
    }
  }
} // namespace dawn
