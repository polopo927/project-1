//подключаем слайдер из файла slider.js
import './slider';
//подключаем наше модальное окно из папки modules
import modals from './modules/modals';
//импортируем табы как функцию
import tabsChooseBalcons from './modules/tabs';

window.addEventListener('DOMContentLoaded', () => {
	//обязательно вызываем функцию для её работы
	modals();
	tabsChooseBalcons({
		headerSelector: '.glazing_slider',
		tabSelector: '.glazing_block',
		contentSelector: '.glazing_content',
		activeClass: 'active'
	});
	tabsChooseBalcons({
		headerSelector: '.decoration_slider',
		tabSelector: '.no_click',
		contentSelector: '.decoration_content > div > div',
		activeClass: 'after_click'
	});
});