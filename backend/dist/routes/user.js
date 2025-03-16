"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const config_1 = require("../config");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post("/up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const hash = yield bcrypt_1.default.hash(password, 7);
        yield db_1.User.create({
            username,
            password: hash,
        });
        return res.json({ msg: "User created successfully..." });
    }
    catch (e) {
        return res.status(411).json({ Error: `User already exists ` });
    }
}));
router.post("/in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.User.findOne({
            username,
        });
        if (!user)
            return res.status(413).json({ Error: "Invalid Credentials" });
        const isPassword = yield bcrypt_1.default.compare(password, user.password); // returns trur or false
        if (isPassword) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.secret);
            return res.json({ TokenGenerated: token });
        }
        return res.status(413).json({ Error: "Invalid Credentials" });
    }
    catch (e) {
        return res.status(413).json({ Error: `Error signing in ${e}` });
    }
}));
exports.default = router;
