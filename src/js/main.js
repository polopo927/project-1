//подключаем слайдер из файла slider.js
import './slider';
//подключаем наше модальное окно из папки modules
import modals from './modules/modals';
//импортируем табы как функцию
import tabsChooseBalcons from './modules/tabs';
//импортируем формы
import formsFeedback from './modules/forms';
//импортируем формы с формами окон
import changeModalState from './modules/changeModalState';

window.addEventListener('DOMContentLoaded', () => {
	const modalState = {};

	changeModalState(modalState);
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
	tabsChooseBalcons({
		headerSelector: '.balcon_icons',
		tabSelector: '.balcon_icons_img',
		contentSelector: '.big_img > img',
		activeClass: 'do_image_more',
		display: 'inline-block'
	})
	formsFeedback(modalState);
});
