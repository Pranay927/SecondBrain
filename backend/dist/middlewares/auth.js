"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
/* to access authenticated endpoints  */
const auth = (req, res, next) => {
    try {
        let { authorization } = req.headers;
        console.log(authorization);
        authorization = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
        if (!authorization)
            return res.status(403).json({ error: "Unauthorized" });
        const decode = jsonwebtoken_1.default.verify(authorization, config_1.secret);
        // use  authorization as string if not undefined
        // @ts-ignore
        req.id = decode.id;
        next();
    }
    catch (error) {
        return res.status(403).json({ Error: "Unauthorized" });
    }
};
exports.default = auth;
