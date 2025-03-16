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
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const content_1 = __importDefault(require("./routes/content"));
const brain_1 = __importDefault(require("./routes/brain"));
const logger_1 = __importDefault(require("./middlewares/logger"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.default);
app.use("/secondBrain/user", user_1.default);
app.use("/secondBrain/content", content_1.default);
app.use("/secondBrain/brain", brain_1.default);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://Limitless:123123123@appledb.yhy8h.mongodb.net/SecondBrain?retryWrites=true&w=majority");
        app.listen(2000, () => {
            console.log("Sever running on http://localhost:2000");
        });
    }
    catch (error) {
        console.log(error);
    }
});
main();
// app.use("/content", content);
// app.use("/brain", brain)
