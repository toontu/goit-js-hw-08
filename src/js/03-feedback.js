import throttle from 'lodash.throttle';
import localStorageService from './local-storage-service';
// в конспекте прописан Сервис для localStorage (+ добавлен метод "remove") для обработки возможных ошибок с конструкцией "try...catch";
// выполнен export default и импорт в текущий файл

const feedbackFormEl = document.querySelector('.feedback-form');

const formFieldsData = {};
const STORAGE_KEY = 'feedback-form-state';

const fillFormFields = () => {
  const dataFromLocalStorage = localStorageService.load(STORAGE_KEY);

  if (dataFromLocalStorage === undefined) {
    return;
  }

  const formElements = feedbackFormEl.elements;
  //   console.dir(formElements);

  const keys = Object.keys(dataFromLocalStorage);
  for (const key of keys) {
    formElements[key].value = dataFromLocalStorage[key];
    //   console.log(dataFromLocalStorage[key]);
    //   console.log(formElements[key].value);
  }

  //   for (const key in dataFromLocalStorage) {
  //     if (dataFromLocalStorage.hasOwnProperty(key)) {
  //       formElements[key].value = dataFromLocalStorage[key];
  //       //   console.log(dataFromLocalStorage[key]);
  //       //   console.log(formElements[key].value);
  //     }
  //   }
};

const onFeedbackFormInput = event => {
  const formFieldName = event.target.name;
  // const formFieldValue = event.target.value;
  const formFieldValue = event.target.value.trim(); // нужно с трим

  formFieldsData[formFieldName] = formFieldValue;

  localStorageService.save(STORAGE_KEY, formFieldsData);
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  console.log(localStorageService.load(STORAGE_KEY));

  localStorageService.remove(STORAGE_KEY);
  event.currentTarget.reset();
};

feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);

fillFormFields();
