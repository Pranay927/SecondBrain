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
const auth_1 = __importDefault(require("../middlewares/auth"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = require("../db");
router.post('/share', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body; // share : boolean
    // @ts-ignore
    const userId = req.id;
    const randomLink = Math.floor(Math.random() * 1000000000000).toPrecision();
    try {
        if (share) {
            const existingLink = yield db_1.Share.findOne({
                userId
            });
            if (existingLink) {
                return res.json({
                    "Share your secondBrain to your friends": existingLink.hash
                });
            }
            yield db_1.Share.create({
                hash: randomLink,
                userId
            });
            return res.json({
                "Share your secondBrain to your friends": randomLink
            });
        }
        else {
            yield db_1.Share.deleteOne({
                userId
            });
            return res.json({
                message: "Disabled the link"
            });
        }
    }
    catch (error) {
        return res.json({ Err: " err found in sharing  the link" });
    }
}));
router.get('/share/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shareLink } = req.params;
    console.log("from /brain/sharLink");
    try {
        const validLink = yield db_1.Share.findOne({
            hash: shareLink,
        });
        if (!validLink)
            return res.status(404).json({ msg: "Second Brain Not Found" });
        const userId = validLink.userId;
        const user = yield db_1.User.findById(userId);
        const userSecondBrain = yield db_1.Content.find({ userId });
        return res.json({
            "Owner of the secondBrain": user.username,
            "Second Brain Contents": userSecondBrain,
        });
    }
    catch (error) {
        return res.json({ Err: " err found in sharing  the link" });
    }
}));
exports.default = router;
