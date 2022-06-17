import { RequestHandler } from 'express';
import { Todo } from '../models/todo';
import { Util } from '../util/Util';
import { FlatFile } from '../util/FlatFile';
const TodoStore = new FlatFile('TodoStorage', 'todos.json');

export const createTodo: RequestHandler = (req, res, next) => {
    const id = Util.generateUID();
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(id, text);

    TodoStore.appendStorage(newTodo)
        .then(() => {
            res.status(201).json({
                status: 'created',
                todo: newTodo,
            });
        })
        .catch(err => next(err));
};

export const getTodos: RequestHandler = (req, res, next) => {
    TodoStore.getStorage()
        .then(todos => {
            res.status(200).json({
                status: 'success',
                todos,
            });
        })
        .catch(err => next(err));
};

export const updateTodo: RequestHandler<{ id: string }> = async (
    req,
    res,
    next
) => {
    try {
        const todos = await TodoStore.getStorage();
        const todoIdx = todos.findIndex((x: Todo) => x.id === req.params.id);
        let todo = todos[todoIdx];
        if (todoIdx === -1 || !todo) {
            return res.status(404).json({
                status: 'fail',
                message: 'No todo found with that id.',
            });
        }

        todo.text = req.body.text;
        todos[todoIdx] = todo;
        await TodoStore.setStorage(todos);

        res.status(200).json({
            status: 'updated',
            todo,
        });
    } catch (err: any) {
        next(err);
    }
};

export const deleteTodo: RequestHandler<{ id: string }> = async (
    req,
    res,
    next
) => {
    try {
        let todos = await TodoStore.getStorage();
        const todoIdx = todos.find((x: Todo) => x.id === req.params.id);
        if (todoIdx !== -1) {
            todos = todos.filter((y: Todo) => y.id !== req.params.id);
            await TodoStore.setStorage(todos);
        }
        res.status(200).json({
            status: 'deleted',
            message: 'Succesfully deleted todo.',
        });
    } catch (err: any) {
        next(err);
    }
};
