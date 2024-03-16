import checkNumInputs from './checkNumInputs'

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
						if (window.getAttribute('type') === 'checkbox') {
							index === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
							element.forEach((box, j) => {
								box.checked = false;
								if (index == j) {
									box.checked = true;
								}
							});
						} else {
							state[prop] = window.value;
						}
						break;
					case 'SELECT':
						state[prop] = window.value;
						break;
				}
				console.log(state);
			});
		});
	}
	bindActionToElements('click', windowForms, 'form');
	bindActionToElements('input', windowHeight, 'height');
	bindActionToElements('input', windowWidth, 'width');
	bindActionToElements('change', windowType, 'type');
	bindActionToElements('change', windowProfile, 'profile');
};

export default changeModalState