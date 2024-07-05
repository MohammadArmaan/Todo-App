/* eslint-disable */
import { create, update, deleteOpp, checkboxChecked } from './crud';

const form = document.querySelector('.form__todo');
const input = document.querySelector('.todo__input');
const addTodo = document.querySelector('.add__todo');
const updateTodo = document.querySelector('.update__todo');
const ul = document.querySelector('ul');
const todos = document.querySelectorAll('.list');
const todoList = document.querySelectorAll('.todo__list');
const checkbox = document.querySelectorAll('.checkbox');
const updateBtn = document.querySelectorAll('.update');
const deleteBtn = document.querySelectorAll('.delete');
let currentTodoId = null;


if (form && updateBtn.length > 0) {
    updateBtn.forEach((updateBtn, index) => {
        updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const todoText = todos[index].querySelector('.todo__list').textContent;
        input.value = todoText; 
        addTodo.classList.add('hidden');
        updateTodo.classList.remove('hidden');
        });
    });
}

form.addEventListener('submit', (e) => {
    if(addTodo.classList.contains('hidden')) return;
    e.preventDefault();
    const text = input.value;
    create(text);

})


if (form && updateBtn.length > 0) {
    updateBtn.forEach((el, index) => {
        el.addEventListener('click', (e) => {
        e.preventDefault();
        const todoText = todos[index].querySelector('.todo__list').textContent;
        input.value = todoText; 
        currentTodoId = el.getAttribute('data'); 
        addTodo.classList.add('hidden');
        updateTodo.classList.remove('hidden');
        });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!updateTodo.classList.contains('hidden')) {
        const text = input.value;
        update(text, currentTodoId); 
      }
    });

}


if(form && deleteBtn.length > 0){
    deleteBtn.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            currentTodoId = el.getAttribute('data');
            deleteOpp(currentTodoId);
        });
    });

}

checkbox.forEach((el) => {
    el.addEventListener('change', (e) => {
        e.preventDefault();
        const id = el.closest('.list').querySelector('.update').getAttribute('data');
        const completed = el.checked;
        checkboxChecked(completed, id);
    });
});
