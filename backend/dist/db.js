"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Share = exports.Tag = exports.Content = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});
const tagSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }
});
const contentSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    type: {
        type: String,
        enum: ['image', 'audio', 'video', 'article'],
    },
    tags: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag"
        }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});
const linkSchema = new Schema({
    hash: {
        type: String,
        required: true
    },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }
});
exports.User = mongoose_1.default.model("User", userSchema);
exports.Content = mongoose_1.default.model("Content", contentSchema);
exports.Tag = mongoose_1.default.model("Tag", tagSchema);
exports.Share = mongoose_1.default.model("Share", linkSchema);
