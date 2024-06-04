"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.async = void 0;
const result_js_1 = require("./result.cjs");
async function async(fn) {
    try {
        const data = await fn;
        return (0, result_js_1.Ok)(data);
    }
    catch (error) {
        return (0, result_js_1.Err)(error);
    }
}
exports.async = async;
