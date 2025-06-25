"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Books_contoller_1 = require("./app/controllers/Books.contoller");
const aggregation_controller_1 = require("./app/controllers/aggregation.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/books', Books_contoller_1.booksRoutes);
app.use('/books', aggregation_controller_1.aggregationRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Library Management');
});
exports.default = app;
// mvc - model  , controller
