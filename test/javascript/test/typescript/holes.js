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
const $cross = dawn.$cross;
const $ = dawn.$;
let code = (() => { return new dawn.Code(dawn.createAST(305, [0, 5], [dawn.createAST(348, [0, 5], [dawn.createAST(238, [0, 5], [dawn.createAST(221, [0, 5], [dawn.createAST(8, [0, 1], [], false), dawn.createAST(39, [1, 3], [], false), dawn.createAST(8, [3, 5], [], false)], false)], false)], false)], false), "return 2 + 2;\n", new Map()); })();
let code2 = (() => { return new dawn.Code(dawn.createAST(305, [0, 11], [dawn.createAST(348, [0, 11], [dawn.createAST(238, [0, 11], [dawn.createAST(221, [0, 11], [dawn.createAST(208, [0, 7], [dawn.createAST(79, [0, 1], [], false), dawn.createAST(20, [1, 2], [], false), dawn.createAST(348, [2, 6], [dawn.createAST(79, [2, 6], [], false)], false), dawn.createAST(21, [6, 7], [], false)], false), dawn.createAST(39, [7, 9], [], false), dawn.createAST(8, [9, 11], [], false)], false)], false)], false)], false), "return p_ref.get(\"code\").run() + 1;\n", new Map([["code", code]])); })();
console.log(code2.run());
let code3 = (() => { return new dawn.Code(dawn.createAST(305, [0, 27], [dawn.createAST(348, [0, 27], [dawn.createAST(235, [0, 27], [dawn.createAST(18, [0, 1], [], false), dawn.createAST(348, [1, 25], [dawn.createAST(238, [1, 25], [dawn.createAST(208, [1, 24], [dawn.createAST(206, [1, 15], [dawn.createAST(79, [1, 11], [], false), dawn.createAST(24, [11, 12], [], false), dawn.createAST(79, [12, 15], [], false)], false), dawn.createAST(20, [15, 16], [], false), dawn.createAST(348, [16, 23], [dawn.createAST(208, [16, 23], [dawn.createAST(79, [16, 17], [], false), dawn.createAST(20, [17, 18], [], false), dawn.createAST(348, [18, 22], [dawn.createAST(79, [18, 22], [], false)], false), dawn.createAST(21, [22, 23], [], false)], false)], false), dawn.createAST(21, [23, 24], [], false)], false), dawn.createAST(26, [24, 25], [], false)], false)], false), dawn.createAST(19, [25, 27], [], false)], false)], false)], false), "{\n    console.log(p_ref.get(\"code\").run());\n}\n", new Map([["code", code]])); })();
code3.run();
function inc(num) {
    return (() => { return new dawn.Code(dawn.createAST(305, [0, 10], [dawn.createAST(348, [0, 10], [dawn.createAST(238, [0, 10], [dawn.createAST(221, [0, 10], [dawn.createAST(208, [0, 6], [dawn.createAST(79, [0, 1], [], false), dawn.createAST(20, [1, 2], [], false), dawn.createAST(348, [2, 5], [dawn.createAST(79, [2, 5], [], false)], false), dawn.createAST(21, [5, 6], [], false)], false), dawn.createAST(39, [6, 8], [], false), dawn.createAST(8, [8, 10], [], false)], false)], false)], false)], false), "return p_ref.get(\"num\").run() + 1;\n", new Map([["num", num]])); })();
}
let res = inc((() => { return new dawn.Code(dawn.createAST(305, [0, 2], [dawn.createAST(348, [0, 2], [dawn.createAST(238, [0, 2], [dawn.createAST(8, [0, 2], [], false)], false)], false)], false), "return 42;\n", new Map()); })());
console.log(res.run());
const v = 42;
const neg = (() => { return new dawn.Code(dawn.createAST(305, [0, 10], [dawn.createAST(348, [0, 10], [dawn.createAST(238, [0, 10], [dawn.createAST(219, [0, 10], [dawn.createAST(40, [0, 1], [], false), dawn.createAST(208, [1, 10], [dawn.createAST(79, [1, 7], [], false), dawn.createAST(20, [7, 8], [], false), dawn.createAST(348, [8, 9], [dawn.createAST(79, [8, 9], [], false)], false), dawn.createAST(21, [9, 10], [], false)], false)], false)], false)], false)], false), "return -p_ref.get(\"v\");\n", new Map([["v", v]])); })();
console.log(neg.run());
