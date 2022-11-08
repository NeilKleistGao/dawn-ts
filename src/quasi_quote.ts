import * as ts from "typescript";

export namespace dawn {
  class Code<T> {
    private m_options = {
      "target": ts.ScriptTarget.ES2016,
      "module": ts.ModuleKind.CommonJS
    };

    private m_compiler_host = ts.createCompilerHost(this.m_options);

    private m_program: ts.Program;

    constructor(p_code: string) {
      this.m_compiler_host.readFile =
        (p_filename: string) => { p_filename; return p_code; };

      this.m_program = ts.createProgram([""], this.m_options, this.m_compiler_host);
    }

    run(): T {
      throw "not implemented yet."; // TODO:
    }
  }

  export function code<T>(p_str: string): Code<T> {
    return new Code<T>(p_str);
  }
  
} // namespace dawn
