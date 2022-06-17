import React from 'react';
import { Todo } from '../models/Todo';
import classes from '../styles/components/TodoList.module.scss';

interface TodoListProps {
    items: Todo[];
    removeItem: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, removeItem }) => {
    return (
        <ul className={classes.TodoList}>
            {items.map(todo => (
                <li key={todo.id} className={classes.TodoItem}>
                    <span>{todo.text}</span>
                    <button onClick={removeItem.bind(null, todo.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
