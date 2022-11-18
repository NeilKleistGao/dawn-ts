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
const $expr = dawn.$expr;
const $stmt = dawn.$stmt;
let code = (() => { return new dawn.Code(dawn.createAST(305, [0, 5], [dawn.createAST(348, [0, 5], [dawn.createAST(238, [0, 5], [dawn.createAST(221, [0, 5], [dawn.createAST(8, [0, 1], [], false), dawn.createAST(39, [1, 3], [], false), dawn.createAST(8, [3, 5], [], false)], false)], false)], false)], false), "return 2 + 2;\n", new Map()); })();
let v4 = code.run();
console.log(v4);
let code2 = (() => { return new dawn.Code(dawn.createAST(305, [0, 22], [dawn.createAST(348, [0, 22], [dawn.createAST(238, [0, 22], [dawn.createAST(208, [0, 22], [dawn.createAST(206, [0, 19], [dawn.createAST(10, [0, 9], [], false), dawn.createAST(24, [9, 10], [], false), dawn.createAST(79, [10, 19], [], false)], false), dawn.createAST(20, [19, 20], [], false), dawn.createAST(348, [20, 21], [dawn.createAST(8, [20, 21], [], false)], false), dawn.createAST(21, [21, 22], [], false)], false)], false)], false)], false), "return \"abcdefg\".substring(2);\n", new Map()); })();
let str = code2.run();
console.log(str);
let code3 = (() => { return new dawn.Code(dawn.createAST(305, [0, 34], [dawn.createAST(348, [0, 34], [dawn.createAST(235, [0, 34], [dawn.createAST(18, [0, 1], [], false), dawn.createAST(348, [1, 32], [dawn.createAST(238, [1, 32], [dawn.createAST(208, [1, 31], [dawn.createAST(206, [1, 15], [dawn.createAST(79, [1, 11], [], false), dawn.createAST(24, [11, 12], [], false), dawn.createAST(79, [12, 15], [], false)], false), dawn.createAST(20, [15, 16], [], false), dawn.createAST(348, [16, 30], [dawn.createAST(10, [16, 30], [], false)], false), dawn.createAST(21, [30, 31], [], false)], false), dawn.createAST(26, [31, 32], [], false)], false)], false), dawn.createAST(19, [32, 34], [], false)], false)], false)], false), "{\n    console.log(\"hello world!\");\n}\n", new Map()); })();
code3.run();
