"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dawn = __importStar(require("../../src/index"));
const expr$ = dawn.expr$;
const stmt$ = dawn.stmt$;
const $ = dawn.$;
let code = (() => { return new dawn.Code(null, "return 2 + 2;\n", new Map()); })();
let code2 = (() => { return new dawn.Code(null, "return p_ref.get(\"code\").run() + 1;\n", new Map([["code", code]])); })();
console.log(code2.run());
let code3 = (() => { return new dawn.Code(null, "{\n    console.log(p_ref.get(\"code\").run());\n}\n", new Map([["code", code]])); })();
code3.run();
