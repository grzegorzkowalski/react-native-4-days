## Redux Toolkit testowa aplikacja 

```typescript
npx expo install @reduxjs/toolkit react-redux
```

```typescript
// store/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;

// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```


```typescript
// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TodoApp from './components/TodoApp';

export default function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

// components/TodoApp.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo, toggleTodo, deleteTodo, setFilter } from '../store/todoSlice';

export default function TodoApp() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  
  const todos = useAppSelector(state => state.todos.todos);
  const filter = useAppSelector(state => state.todos.filter);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Toolkit TODO</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Dodaj zadanie..."
          onSubmitEditing={handleAdd}
        />
        <Button title="Dodaj" onPress={handleAdd} />
      </View>

      <View style={styles.filters}>
        <Button 
          title="Wszystkie" 
          onPress={() => dispatch(setFilter('all'))}
          color={filter === 'all' ? '#007AFF' : '#999'}
        />
        <Button 
          title="Aktywne" 
          onPress={() => dispatch(setFilter('active'))}
          color={filter === 'active' ? '#007AFF' : '#999'}
        />
        <Button 
          title="Ukończone" 
          onPress={() => dispatch(setFilter('completed'))}
          color={filter === 'completed' ? '#007AFF' : '#999'}
        />
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity 
              style={styles.todoText}
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <Text style={item.completed && styles.completed}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
              <Text style={styles.delete}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  inputContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5 },
  filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  todoItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  todoText: { flex: 1 },
  completed: { textDecorationLine: 'line-through', color: '#999' },
  delete: { fontSize: 20 },
});
```

## Zustand testowa aplikacja

```typescript
npx expo install zustand
```

````typescript
// store/useTodoStore.ts
import { create } from 'zustand';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  filter: 'all',
  
  addTodo: (text) => set((state) => ({
    todos: [
      ...state.todos,
      {
        id: Date.now().toString(),
        text,
        completed: false,
      }
    ]
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  
  setFilter: (filter) => set({ filter }),
}));
````

```typescript
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTodoStore } from './store/useTodoStore';

function TodoExample2() {
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  
  return (
    <View>
      <Button 
        title="Dodaj TODO" 
        onPress={() => addTodo('Nowe zadanie')} 
      />
      
      {todos.map(todo => (
        <View key={todo.id}>
          <Text>{todo.text}</Text>
          <Button title="Toggle" onPress={() => toggleTodo(todo.id)} />
          <Button title="Usuń" onPress={() => deleteTodo(todo.id)} />
        </View>
      ))}
    </View>
  );
}
```


## Task 1 Stop-watch Redux Toolkit version

Implement a stopwatch application. It should display two buttons: start and stop.
These should respectively start and stop the counter on click. These buttons should be alternately disabled, i.e.:
if the counter is not running, the stop button is disabled,
if the counter is running, the start button is disabled.
Use the `Pressable` component for this.
In the `Text` component, display the current counter value.

After starting, the counter should increase every second, and its value should be kept in the application state.
At the bottom of the application, render a save button. Clicking it should add the current
counter value to the results list.

Example application state:
```js
{
  "isCounting": false,
  "value": 0
}
```

## Task 2

Complete the above task using Zustand.