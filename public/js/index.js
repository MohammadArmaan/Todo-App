/* eslint-disable */
import { create, update, deleteOpp, checkboxChecked } from './crud';
import { login, logout } from './login';
import { signup } from './signup';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';
import { showAlert } from './alerts';

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

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const forgotPasswordForm = document.querySelector('.form--forgotPassword');
const resetPasswordPasswordForm = document.querySelector('.form--resetPassword');

const logoutLink = document.querySelector('.logout__link');

const themeToggleButtons = document.querySelectorAll('.theme-icons');
const currentTheme = localStorage.getItem('theme');

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

if(form){
    form.addEventListener('submit', (e) => {
        if(addTodo.classList.contains('hidden')) return;
        e.preventDefault();
        const text = input.value;
        create(text);
    
    })
}

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

if(checkbox){
    checkbox.forEach((el) => {
        el.addEventListener('change', (e) => {
            e.preventDefault();
            const id = el.closest('.list').querySelector('.update').getAttribute('data');
            const completed = el.checked;
            if(el.checked){
                showAlert('success', 'Todo Completed!')
            }
            checkboxChecked(completed, id);
        });
    });
}

if(loginForm){
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        await login(email, password);
    })
}

if(signupForm){
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        signup(name, email, password, passwordConfirm)
    })
}

if(forgotPasswordForm){
    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        forgotPassword(email);
    })
}

if(resetPasswordPasswordForm){
    resetPasswordPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        const token = document.getElementById('reset-token').value;
        resetPassword(password, passwordConfirm, token);
    })
}

if(logoutLink){
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    })
}


if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      document.documentElement.style.setProperty('--dark-color', '#000');
      document.documentElement.style.setProperty('--bright-color', '#fff');
    } else {
      document.documentElement.style.setProperty('--dark-color', '#fff');
      document.documentElement.style.setProperty('--bright-color', '#000');
    }
  } else {
    // Set default theme if no theme is stored in local storage
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.style.setProperty('--dark-color', '#fff');
    document.documentElement.style.setProperty('--bright-color', '#000');
  }
  
  if (themeToggleButtons) {
    themeToggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        theme = theme === 'dark' ? 'light' : 'dark';
        if (theme === 'dark') {
          document.documentElement.style.setProperty('--dark-color', '#000');
          document.documentElement.style.setProperty('--bright-color', '#fff');
        } else {
          document.documentElement.style.setProperty('--dark-color', '#fff');
          document.documentElement.style.setProperty('--bright-color', '#000');
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      });
    });
  }