import * as ts from "typescript";

export namespace dawn {
  interface MatchingResult {}

  class Code<T> {
    private static s_options = {
      "target": ts.ScriptTarget.ES2016,
      "module": ts.ModuleKind.CommonJS
    };

    private m_program: ts.Program;
    private m_js: string | undefined = undefined;
    private m_function: Function | undefined;

    constructor(p_code: string) {
      let compiler_host = ts.createCompilerHost(Code.s_options);
      compiler_host.readFile =
        (p_filename: string) => { p_filename; return p_code; };
      compiler_host.writeFile =
        (p_filename: string, p_content: string) => { p_filename; this.m_js = p_content; };

      this.m_program = ts.createProgram(["code.ts"], Code.s_options, compiler_host);
    }

    run(): T {
      if (this.m_function === undefined) {
        this.m_program.emit();
        const js = this.m_js as string;
        this.m_function = new Function(js);
      }

      return (this.m_function as Function)() as T;
    }

    match(pattern: Code<T>): MatchingResult | null {
      return null; // TODO:
    }
  }

  export function code<T>(p_str: string): Code<T> {
    return new Code<T>(p_str);
  }
  
} // namespace dawn
