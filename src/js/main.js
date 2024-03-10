//подключаем слайдер из файла slider.js
import './slider';
//подключаем наше модальное окно из папки modules
import modals from './modules/modals';
//импортируем табы как функцию
import tabsChooseBalcons from './modules/tabs';

window.addEventListener('DOMContentLoaded', () => {
	//обязательно вызываем функцию для её работы
	modals();
	tabsChooseBalcons('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
	tabsChooseBalcons('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
});