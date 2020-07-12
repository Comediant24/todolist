const root = document.querySelector('.root');
const buttonTaskAdd = document.querySelector('.task__button-add');

const taskAddTemplate = document.querySelector('#todo-list').content;
const todoList = document.querySelector('.todo__list');

const taskStart = [
  {
  title: 'My Great task',
  description: 'write them down!',
  },
];

// Функция отмены Создания формы задачи по нажатию Esc
root.addEventListener('keydown', (evt) => {
  if (evt.key == 'Escape') {
    if (root.querySelector('.todo__item_type_add')) {
      root.querySelector('.todo__item').remove()
    }
  }
});

// Функция переключения с Формы на Задачу
const toggleDisplayTask = cloneNode => {
  cloneNode.querySelector('.todo__item-form').classList.toggle('todo__item-form_hidden');
  cloneNode.querySelector('.todo__item-task').classList.toggle('todo__item-task_hidden');
};

// Функция инициализации формы для новой задачи
const createAddTaskForm = () => {
  const taskAddItem = taskAddTemplate.cloneNode(true);

  toggleDisplayTask(taskAddItem);
  saveTask(taskAddItem);
  return taskAddItem;
};

// Функция добавления формы новой задачи на страницу
const renderAddTaskForm = () => {
  const taskAddForm = createAddTaskForm();
  todoList.prepend(taskAddForm);
};

// Функция инициализации Стартовой задачи 
const createStartTask = (title, description) => {
  const taskNewItem = taskAddTemplate.cloneNode(true);
  taskNewItem.querySelector('.todo__item').classList.remove('todo__item_type_add');

  taskNewItem.querySelector('.todo__title').textContent = title;
  taskNewItem.querySelector('.todo__description').textContent = description;
  
  todoEventListener (taskNewItem);
  return taskNewItem;
};

// Функция кнопки удаления задачи
const deleteTask = evt => {
  evt.target.closest('.todo__item').remove();
};

// Функция кнопки копирования задачи
const copyTask = evt => {
  const copyTodoItem = evt.target.closest('.todo__item');
  const newTodoItem = copyTodoItem.cloneNode(true);

  todoEventListener(newTodoItem);
  copyTodoItem.after(newTodoItem);
};

// Функция Редактирования задачи
const editTask = evt => {
  const editItemTask = evt.target.closest('.todo__item');
  toggleDisplayTask (editItemTask);

  editItemTask.querySelector('.todo__input_type_title').value = editItemTask.querySelector('.todo__title').textContent;
  editItemTask.querySelector('.todo__input_type_description').value = editItemTask.querySelector('.todo__description').textContent;
  
  escEditTask (editItemTask);
  saveTask(editItemTask);
};

//Функция слушателей элементов
function todoEventListener (cloneNode) {
  cloneNode.querySelector('.todo__button_type_delete').addEventListener('click', deleteTask);
  cloneNode.querySelector('.todo__button_type_copy').addEventListener('click', copyTask);
  cloneNode.querySelector('.todo__button_type_edit').addEventListener('click', editTask);
}

// Функция добавления Стартовой задачи на страницу
const renderStartTask = (title, description) => {
  const taskAddNew = createStartTask(title, description);
  todoList.prepend(taskAddNew);
};

// Функция отмены редактирования задачи по нажатию Esc
function escEditTask (cloneNode) {
  cloneNode.closest('.root').addEventListener ('keydown', (evt) => {
    if (!cloneNode.querySelector('.todo__item-form').classList.contains('todo__item-form_hidden')) {
      if (evt.key == 'Escape') {
        toggleDisplayTask(cloneNode);
      }
    }
  })
}

// Функция обработчика отправки введеных значений формы
const formSubmitHandlerSaveTask = evt => {
  evt.preventDefault();
  const task = evt.target.closest('.todo__item');

  task.classList.remove('todo__item_type_add');
  task.querySelector('.todo__title').textContent = task.querySelector('.todo__input_type_title').value;
  task.querySelector('.todo__description').textContent = task.querySelector('.todo__input_type_description').value;
  
  toggleDisplayTask(task);
  todoEventListener(task);
};

// Функция слушателя кнопки Сохранения формы новой задачи
const saveTask = cloneNode => {
  cloneNode.querySelector('.todo__form').addEventListener('submit', formSubmitHandlerSaveTask);
};

// Инициализация Стартовых задач
taskStart.forEach (item => {
  renderStartTask(item.title, item.description);
});

// Слушатель кнопки # Добавить задачу
buttonTaskAdd.addEventListener('click', () => {
  const todoItem = todoList.querySelector('.todo__item');
  if ( todoItem == null || (!todoItem.classList.contains('todo__item_type_add')) ) {
    renderAddTaskForm();
  } 
});
