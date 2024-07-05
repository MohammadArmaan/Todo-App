/* eslint-disable */
export const saveToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  
export const loadFromLocalStorage = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  };
  
export const updateLocalStorage = (todo, id) => {
    const todos = loadFromLocalStorage();
    const updatedTodos = todos.map((t) => (t.id === id ?  t.todo  : t));
    saveToLocalStorage(updatedTodos);
  };
  
export const deleteFromLocalStorage = (id) => {
    const todos = loadFromLocalStorage();
    const updatedTodos = todos.filter((t) => t.id !== id);
    saveToLocalStorage(updatedTodos);
  };
  