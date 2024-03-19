//подключаем слайдер из файла slider.js
import './slider';
import {modals, tabsChooseBalcons,formsFeedback,changeModalState,timer} from './modules'

window.addEventListener('DOMContentLoaded', () => {
	const modalState = {};
	const deadline = '2024-03-30';

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
	timer('.container1', deadline)
});
