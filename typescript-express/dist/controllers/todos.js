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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const Util_1 = require("../util/Util");
const FlatFile_1 = require("../util/FlatFile");
const TodoStore = new FlatFile_1.FlatFile('TodoStorage', 'todos.json');
const createTodo = (req, res, next) => {
    const id = Util_1.Util.generateUID();
    const text = req.body.text;
    const newTodo = new todo_1.Todo(id, text);
    TodoStore.appendStorage(newTodo)
        .then(() => {
        res.status(201).json({
            status: 'created',
            todo: newTodo,
        });
    })
        .catch(err => next(err));
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    TodoStore.getStorage()
        .then(todos => {
        res.status(200).json({
            status: 'success',
            todos,
        });
    })
        .catch(err => next(err));
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield TodoStore.getStorage();
        const todoIdx = todos.findIndex((x) => x.id === req.params.id);
        let todo = todos[todoIdx];
        if (todoIdx === -1 || !todo) {
            return res.status(404).json({
                status: 'fail',
                message: 'No todo found with that id.',
            });
        }
        todo.text = req.body.text;
        todos[todoIdx] = todo;
        yield TodoStore.setStorage(todos);
        res.status(200).json({
            status: 'updated',
            todo,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todos = yield TodoStore.getStorage();
        const todoIdx = todos.find((x) => x.id === req.params.id);
        if (todoIdx !== -1) {
            todos = todos.filter((y) => y.id !== req.params.id);
            yield TodoStore.setStorage(todos);
        }
        res.status(200).json({
            status: 'deleted',
            message: 'Succesfully deleted todo.',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTodo = deleteTodo;
