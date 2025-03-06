import React, { useRef } from 'react';
import classes from '../styles/components/NewTodo.module.scss';

interface NewTodoProps {
    addTodo: (str: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ addTodo }) => {
    const textRef = useRef<HTMLInputElement>(null);

    function handleAddTodo(event: React.FormEvent): void {
        event.preventDefault();
        const enteredText = textRef.current!.value;
        if (enteredText !== '') {
            addTodo(enteredText);
            textRef.current!.value = '';
        }
    }

    return (
        <form onSubmit={handleAddTodo} className={classes.NewTodo}>
            <div className={classes.FormGroup}>
                <label htmlFor='todo-text'>Enter a new Todo</label>
                <input type='text' ref={textRef} />
            </div>
            <div className={classes.FormActions}>
                <button type='submit'>Add Todo</button>
            </div>
        </form>
    );
};

export default NewTodo;
