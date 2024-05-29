const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, '..', 'data', 'todos.json');

// Read todos from file
const readTodosFromFile = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading todos from file:', error);
        return [];
    }
};

// Write todos to file
const writeTodosToFile = (todos) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 4), 'utf8');
    } catch (error) {
        console.error('Error writing todos to file:', error);
    }
};

let todos = readTodosFromFile();

// Create a new todo
router.post('/', (req, res) => {
    const { task } = req.body;
    if (task) {
        const newTodo = { id: todos.length + 1, task };
        todos.push(newTodo);
        writeTodosToFile(todos);
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: 'Task is required' });
    }
});

// Get all todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Update a todo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id == id);
    if (todoIndex !== -1) {
        if (task) {
            todos[todoIndex].task = task;
            writeTodosToFile(todos);
            res.json(todos[todoIndex]);
        } else {
            res.status(400).json({ error: 'Task is required' });
        }
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id == id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        writeTodosToFile(todos);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

module.exports = router;

