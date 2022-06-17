"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});
app.use('/todos', todos_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
    });
});
app.listen(3000, console.log.bind(null, 'Listening to port 3000'));
