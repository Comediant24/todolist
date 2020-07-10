// const taskAddFormTemplate = document.querySelector('#form-todo-list').content;
const taskAddTemplate = document.querySelector('#todo-list').content;
const todoList = document.querySelector('.todo__list');

const buttonTaskAdd = document.querySelector('.task__button-add');

const taskStart = [
  {
  title: 'Google Project',
  description: 'website update!'
  }
];

// Функция инициализации формы для новой задачи
function createAddTaskForm () {
  const taskAddItem = taskAddTemplate.cloneNode(true);
  taskAddItem.querySelector('.todo__item-form').classList.toggle('todo__item-form_hidden');
  taskAddItem.querySelector('.todo__item-task').classList.toggle('todo__item-task_hidden');

  saveTask(taskAddItem);
  return taskAddItem;
}

// Функция добавления формы новой задачи на страницу
function renderAddTaskForm () {
  const taskAddForm = createAddTaskForm();
  todoList.prepend(taskAddForm);
}

// Функция инициализации новой задачи 
function createNewTask (title, description) {
  const taskNewItem = taskAddTemplate.cloneNode(true);
  
  taskNewItem.querySelector('.todo__title').textContent = title;
  taskNewItem.querySelector('.todo__description').textContent = description;
  
  todoEventListener (taskNewItem)
  return taskNewItem;
}

// Функция кнопки удаления задачи
function deleteTask (evt) {
  evt.target.closest('.todo__item').remove();
}

//Функция кнопки копирования задачи
function copyTask (evt) {
    const copyTodoItem = evt.target.closest('.todo__item');
    const newTodoItem = copyTodoItem.cloneNode(true);

    todoEventListener (newTodoItem);
    copyTodoItem.after(newTodoItem);
}

//Функция слушателей элементов
function todoEventListener (cloneNode) {
  cloneNode.querySelector('.todo__button_type_delete').addEventListener('click', deleteTask);
  cloneNode.querySelector('.todo__button_type_copy').addEventListener('click', copyTask);
}

// Функция добавления новой задачи на страницу
function renderNewTask (title, description) {
  const taskAddNew = createNewTask(title, description);
  todoList.prepend(taskAddNew);
}

// Функция удаления формы для новой задачи
function deleteAddTaskForm (evt) {
  evt.target.closest('.todo__item').remove();
}

// Функция обработчика отправки введеных значений формы
function formSubmitHandlerSaveTask (evt) {
  evt.preventDefault();
  const task = evt.target.closest('.todo__item')
  
  task.querySelector('.todo__title').textContent = task.querySelector('.todo__input_type_title').value;
  task.querySelector('.todo__description').textContent = task.querySelector('.todo__input_type_description').value;

  task.querySelector('.todo__item-form').classList.toggle('todo__item-form_hidden');
  task.querySelector('.todo__item-task').classList.toggle('todo__item-task_hidden');

  todoEventListener(task);
}

// Функция слушателя кнопки Сохранения формы новой задачи
function saveTask (cloneNode) {
  cloneNode.querySelector('.todo__form').addEventListener('submit', formSubmitHandlerSaveTask);
}

// Инициализация стартовых задач
taskStart.forEach (item => {
  renderNewTask(item.title, item.description);
})

// Слушатель кнопки # Добавить задачу
buttonTaskAdd.addEventListener('click', () => {
  const todoItem = todoList.querySelector('.todo__item');
  if ( todoItem == null || !(todoItem.classList.contains('todo__item_type_add')) ) {
    renderAddTaskForm();
  } 
});