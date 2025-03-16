"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let x = 0;
const logger = (req, res, next) => {
    try {
        x += 1;
        console.log(`________________________________`);
        console.log(`Req number ${x}...`);
        console.log(`URL: ${req.url}`);
        console.log(`Method: ${req.method}`);
        console.log(`Body: ${req.body}`);
        console.log(`________________________________`);
        next();
    }
    catch (error) {
        return res.status(400).json({ Error: error });
    }
};
exports.default = logger;
