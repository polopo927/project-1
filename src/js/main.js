//подключаем слайдер из файла slider.js
import './slider';
//подключаем наше модальное окно из папки modules
import modals from './modules/modals';

window.addEventListener('DOMContentLoaded', () => {
	//обязательно вызываем функцию для её работы
	modals();
});