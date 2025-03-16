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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middlewares/auth"));
const db_1 = require("../db");
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, title, type, tags } = req.body;
        // @ts-ignore
        const userId = req.id;
        const newContent = yield db_1.Content.create({
            link,
            title,
            type,
            tags: tags || [],
            userId,
        });
        return res.json({ "New Brain Added": newContent });
    }
    catch (e) {
        return res.status(413).json({ "Error": `Error adding content ${e}` });
    }
}));
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.id;
        const content = yield db_1.Content.find({
            userId,
        });
        return res.json({ "Your Brains": content });
    }
    catch (e) {
        return res.status(413).json({ "Error": `Error fetching content ${e}` });
    }
}));
router.delete('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const { contentId } = req.body;
        const content = yield db_1.Content.findByIdAndDelete(contentId);
        return res.json({ "Deleted the Brain ": content });
    }
    catch (e) {
        return res.status(413).json({ "Error": `Error while deleting ${e}` });
    }
}));
exports.default = router;
