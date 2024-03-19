import {checkNumInputs} from './index'

const changeModalState = (state) => {
	const windowForms = document.querySelectorAll('.balcon_icons_img');
	const windowWidth = document.querySelectorAll('#width');
	const windowHeight = document.querySelectorAll('#height');
	const windowType = document.querySelectorAll('#view_type');
	const windowProfile = document.querySelectorAll('.checkbox');

	checkNumInputs('#width');
	checkNumInputs('#height');

	const bindActionToElements = (event, element, prop) => {
		element.forEach((window, index) => {
			window.addEventListener(event, () => {
				switch (window.nodeName) {
					case 'SPAN':
						state[prop] = index;
						break;
					case 'INPUT':
					case 'SELECT':
							state[prop] = window.value;
						break;
				}
			});
		});
	}
	bindActionToElements('click', windowForms, 'form');
	bindActionToElements('input', windowHeight, 'height');
	bindActionToElements('input', windowWidth, 'width');
	bindActionToElements('change', windowType, 'type');
	bindActionToElements('change', windowProfile, 'profile');
};

export {changeModalState}