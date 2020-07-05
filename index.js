const taskAddFormTemplate = document.querySelector('#form-todo-list').content;
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
  const taskAddItem = taskAddFormTemplate.cloneNode(true);
  
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
  
  deleteTask (taskNewItem)
  return taskNewItem;
}

// Функция удаления задачи
function deleteTask (cloneNode) {
  cloneNode.querySelector('.todo__button_type_delete').addEventListener('click', (evt) => {
    evt.target.closest('.todo__item').remove();
  })
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
  const titleForm = document.querySelector('.todo__input_type_title').value;
  const descriptionForm = document.querySelector('.todo__input_type_description').value;
  deleteAddTaskForm (evt);
  renderNewTask (titleForm, descriptionForm);
}

// Функция слушателя кнопки сохранить формы новой задачи
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