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

// cлушатель отмены Создания формы задачи по нажатию Esc
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

// Функция получения инпута Заголовка Задачи
const createFormElement = cloneNode => {
  return cloneNode.querySelector('.todo__input_type_title');
};

// Функция показа ошибки валидации инпута
const showInputError = (element, errorMessage) => {
  element.classList.add('todo__input_type_error');
  element.closest('.todo__form').querySelector('#title-input-error').textContent = errorMessage;
  element.closest('.todo__form').querySelector('.svg__button-path_save').setAttribute('fill', '#ff9f9f');
  element.closest('.todo__form').querySelector('.todo__button_type_save').classList.add('todo__button_inactive');
};

// Функция снятия ошибки валидации инпута
const hideInputError = (element) => {
  element.classList.remove('todo__input_type_error');
  element.closest('.todo__form').querySelector('#title-input-error').textContent = '';
  element.closest('.todo__form').querySelector('.svg__button-path_save').setAttribute('fill', '#40C785');
  element.closest('.todo__form').querySelector('.todo__button_type_save').classList.remove('todo__button_inactive');
};

// Функция проверки валидности инпута
const isValid = element => {
  if (!element.validity.valid) {
    showInputError(element, element.validationMessage);
  } else {
    hideInputError(element);
  }
};

// Функция слушателя Инпута заголовка задачи
const inputListener = (element) => {
  element.addEventListener('input', () => {
    isValid(element);
  });
};

// Функция добавления формы новой задачи на страницу
const renderAddTaskForm = () => {
  const taskAddForm = createAddTaskForm();
  todoList.prepend(taskAddForm);

  const editFormElement = todoList.querySelector('.todo__input_type_title');
  isValid(editFormElement);
  
  inputListener(editFormElement);
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

// Функция отмены Редактирования задачи по нажатию Esc
const escEditTask = cloneNode => {
  cloneNode.closest('.root').addEventListener ('keydown', (evt) => {
    if (!cloneNode.querySelector('.todo__item-form').classList.contains('todo__item-form_hidden')) {
      if (evt.key == 'Escape') {
        toggleDisplayTask(cloneNode);
      }
    }
  })
};

// Функция открытия редактора формы задачи по клику
const editClickListener = (evt, element) => {
  if (evt.target.classList.contains('todo__title')) {
    element.querySelector('.todo__input_type_title').focus();
  } else if (evt.target.classList.contains('todo__description')) {
    element.querySelector('.todo__input_type_description').focus();
    }
};

// Функция Редактирования задачи
const editTask = evt => {
  const editItemTask = evt.target.closest('.todo__item');
  toggleDisplayTask (editItemTask);
  
  editItemTask.querySelector('.todo__input_type_title').value = editItemTask.querySelector('.todo__title').textContent;
  editItemTask.querySelector('.todo__input_type_description').value = editItemTask.querySelector('.todo__description').textContent;
  
  const editFormElement = createFormElement(editItemTask);

  editItemTask.addEventListener('click', (evt) => {
    editClickListener(evt, editItemTask);
  });

  isValid(editFormElement);
  inputListener (editFormElement);

  escEditTask(editItemTask);
  saveTask(editItemTask);
};

//Функция слушателей элементов
function todoEventListener (cloneNode) {
  cloneNode.querySelector('.todo__button_type_delete').addEventListener('click', deleteTask);
  cloneNode.querySelector('.todo__button_type_copy').addEventListener('click', copyTask);
  cloneNode.querySelector('.todo__button_type_edit').addEventListener('click', editTask);
  cloneNode.querySelector('.todo__title').addEventListener('click', editTask);
  cloneNode.querySelector('.todo__description').addEventListener('click', editTask);
}

// Функция добавления Стартовой задачи на страницу
const renderStartTask = (title, description) => {
  const taskAddNew = createStartTask(title, description);
  todoList.prepend(taskAddNew);
};


// Функция обработчика отправки введеных значений формы
function formSubmitHandlerSaveTask (evt) {
  evt.preventDefault();
  const task = evt.target.closest('.todo__item');

  if (task.querySelector('.todo__input_type_title').classList.contains('todo__input_type_error')) {
    return false;
  };

  task.classList.remove('todo__item_type_add');
  task.querySelector('.todo__title').textContent = task.querySelector('.todo__input_type_title').value;
  task.querySelector('.todo__description').textContent = task.querySelector('.todo__input_type_description').value;
  
  toggleDisplayTask(task);
  todoEventListener(task);
}

// Функция слушателя кнопки Сохранения формы новой задачи
function saveTask (cloneNode) {
  cloneNode.querySelector('.todo__form').addEventListener('submit', formSubmitHandlerSaveTask);
}

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
