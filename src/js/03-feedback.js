import throttle from 'lodash.throttle';

// Refs
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};
restoreInput();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log({ email: refs.email.value, message: refs.message.value });
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function restoreInput() {
  const savedObject = localStorage.getItem(LOCALSTORAGE_KEY);
  const parsedObject = JSON.parse(savedObject);

  if (parsedObject) {
    refs.message.value = parsedObject.message;
  }
  if (parsedObject) {
    refs.email.value = parsedObject.email;
  }
}
