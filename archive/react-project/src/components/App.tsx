import React, { useState } from 'react';

import { Todo } from '../models/Todo';
import Page from '../containers/Page';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import classes from '../styles/components/App.module.scss';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: uid(), text: 'Finish the course' },
    ]);

    function uid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0,
                // eslint-disable-next-line
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    function addTodo(content: string) {
        const newTodo: Todo = {
            id: uid(),
            text: content,
        };

        setTodos(st => [...st, newTodo]);
    }

    function removeTodo(id: string) {
        setTodos(ps => ps.filter(x => x.id !== id));
    }

    return (
        <Page>
            <div className={classes.App}>
                <div className={classes.Header}>The Great Todo List</div>
                <NewTodo addTodo={addTodo} />
                <TodoList items={todos} removeItem={removeTodo} />
            </div>
        </Page>
    );
};

export default App;
