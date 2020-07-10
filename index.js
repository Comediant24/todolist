// const taskAddFormTemplate = document.querySelector('#form-todo-list').content;
const taskAddTemplate = document.querySelector('#todo-list').content;
const todoList = document.querySelector('.todo__list');

const buttonTaskAdd = document.querySelector('.task__button-add');

const taskStart = [
  {
  title: 'My Great task',
  description: 'write them down!'
  }
];

toggleDisplayTask = cloneNode => {
  cloneNode.querySelector('.todo__item-form').classList.toggle('todo__item-form_hidden');
  cloneNode.querySelector('.todo__item-task').classList.toggle('todo__item-task_hidden');
};

// Функция инициализации формы для новой задачи
createAddTaskForm = () => {
  const taskAddItem = taskAddTemplate.cloneNode(true);
  
  toggleDisplayTask(taskAddItem);
  saveTask(taskAddItem);
  return taskAddItem;
};

// Функция добавления формы новой задачи на страницу
renderAddTaskForm = () => {
  const taskAddForm = createAddTaskForm();
  todoList.prepend(taskAddForm);
};

// Функция инициализации новой задачи 
createNewTask = (title, description) => {
  const taskNewItem = taskAddTemplate.cloneNode(true);
  
  taskNewItem.querySelector('.todo__title').textContent = title;
  taskNewItem.querySelector('.todo__description').textContent = description;
  
  todoEventListener (taskNewItem)
  return taskNewItem;
};

// Функция кнопки удаления задачи
deleteTask = evt => {
  evt.target.closest('.todo__item').remove();
};

// Функция кнопки копирования задачи
copyTask = evt => {
  const copyTodoItem = evt.target.closest('.todo__item');
  const newTodoItem = copyTodoItem.cloneNode(true);

  todoEventListener (newTodoItem);
  copyTodoItem.after(newTodoItem);
};

// Функция редактирования задачи
editTask = evt => {
  const editItemTask = evt.target.closest('.todo__item');
  toggleDisplayTask (editItemTask);

  editItemTask.querySelector('.todo__input_type_title').value = editItemTask.querySelector('.todo__title').textContent;
  editItemTask.querySelector('.todo__input_type_description').value = editItemTask.querySelector('.todo__description').textContent;

  saveTask(editItemTask);
};

//Функция слушателей элементов
function todoEventListener (cloneNode) {
  cloneNode.querySelector('.todo__button_type_delete').addEventListener('click', deleteTask);
  cloneNode.querySelector('.todo__button_type_copy').addEventListener('click', copyTask);
  cloneNode.querySelector('.todo__button_type_edit').addEventListener('click', editTask);
}  

// Функция добавления новой задачи на страницу
renderNewTask = (title, description) => {
  const taskAddNew = createNewTask(title, description);
  todoList.prepend(taskAddNew);
};

// Функция обработчика отправки введеных значений формы
formSubmitHandlerSaveTask = evt => {
  evt.preventDefault();
  const task = evt.target.closest('.todo__item')
  
  task.querySelector('.todo__title').textContent = task.querySelector('.todo__input_type_title').value;
  task.querySelector('.todo__description').textContent = task.querySelector('.todo__input_type_description').value;
  
  toggleDisplayTask(task);
  todoEventListener(task);
};

// Функция слушателя кнопки Сохранения формы новой задачи
saveTask = cloneNode => {
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