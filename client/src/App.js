import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [todoId, setTodoId] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (description, id) => {
    setEditMode(true)
    setEditValue(description)
    setTodoId(id)
  }

  const handleUpdate = async (id) => {
    try {
      await axios.post(`http://localhost:3040/todo/update/${id}`,{
        description: editValue
      });
      setEditMode(false);
      setEditValue('');
      fetchTodos();
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3040/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.log('Error deleting todo: ', error)
    }
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3040/todo/list');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error)
    }
  }

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:3040/todo/add', {
        description: newTodo
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.log('Error adding todo', error)
    }
  }

  return(
    <div>
      <h1>Todo List</h1>
      <Box display="flex" alignItems="center">
        <TextField
        label="Add To-Do"
        variant='outlined'
        value={newTodo}
        onChange={(e)=> setNewTodo(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={addTodo} disabled={!newTodo}>
        Add
      </Button>

      <List>
        {todos.map((todo)=>(
          <ListItem key={todo._id} disablePadding>
            {!editMode ? (
              <>
              <ListItemText primary={todo.description}/>
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='Edit' onClick={()=> handleEdit(todo.description, todo._id)}>
                  <Edit/>
                </IconButton>
                <IconButton edge='end' aria-label='Delete' onClick={()=> handleDelete(todo._id)}>
                  <Delete/>
                </IconButton>
              </ListItemSecondaryAction>
              </>
            ) : (
              todoId == todo._id ?
                
              <>
                <TextField
                label='Edit To-Do'
                variant='outlined'
                value={editValue}
                onChange={(e)=>setEditValue(e.target.value)}
                />
                <Button 
                variant='outlined'
                onClick={()=>handleUpdate(todo._id)}
                disabled={!editMode}>
                  Update
                </Button>
                </>
              : ''
            )

            }
          </ListItem>
        ))}
      </List>
    </div>
  )



}

export default App;