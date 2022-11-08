import * as ts from "typescript";

export namespace dawn {
  class Code<T> {
    private static s_options = {
      "target": ts.ScriptTarget.ES2016,
      "module": ts.ModuleKind.CommonJS
    };

    private m_compiler_host = ts.createCompilerHost(Code.s_options);

    private m_program: ts.Program;
    private m_checker: ts.TypeChecker;
    private m_js: string | null = null;

    constructor(p_code: string) {
      this.m_compiler_host.readFile =
        (p_filename: string) => { p_filename; return p_code; };
      this.m_compiler_host.writeFile =
        (p_filename: string, p_content: string) => { p_filename; this.m_js = p_content; };

      this.m_program = ts.createProgram([""], Code.s_options, this.m_compiler_host);
      this.m_checker = this.m_program.getTypeChecker();
    }

    run(): T {
      return eval(this.m_js as string) as T;
    }
  }

  export function code<T>(p_str: string): Code<T> {
    return new Code<T>(p_str);
  }
  
} // namespace dawn
