const tabsChooseBalcons = ({ headerSelector, tabSelector, contentSelector, activeClass }) => {
	const header = document.querySelector(headerSelector);
	const tabs = document.querySelectorAll(tabSelector);
	const contents = document.querySelectorAll(contentSelector);

	//создаём функцию которая будет скрывать контент
	const hideTabContent = () => {
		//перебипаем массив с помощью forEach
		contents.forEach(content => {
			//при переборе заменяем block на none 
			content.style.display = 'none';

		});

		//перебираем все табы 
		tabs.forEach(tab => {
			//удаляем у них класс активности
			tab.classList.remove(activeClass);
		});
	}

	//функция будет показывать нужный контент
	//в аргумент закидываем счётчик
	const showTabContent = (i = 0) => {
		//обращаемся к контенту с определённым индексом и присваевываем ему дисплей block
		contents[i].style.display = 'block';
		//обращаемся к определённому табу и добавляем ему класс активности
		tabs[i].classList.add(activeClass);
	}

	const checkClass = (event) => {
		const target = event.target;
		//так как мы уже работаем с классами вырезаем первую точку
		const tabClass = tabSelector.slice(1);
		//создаём условие где проверяем куда нажал пользователь и проверяем есть ли у него этот класс
		if (target && (target.classList.contains(tabClass) ||
			//проверяем есть ли у родителя этот класс
			target.parentNode.classList.contains(tabClass))) {
			//и если есть то мы перебираем табы с их индексом
			tabs.forEach((tab, index) => {
				//если пользователь кликнул по табу который перебирается
				if (target == tab || target.parentNode == tab) {
					//скрываем контент
					hideTabContent();
					//показываем нажатый таб
					showTabContent(index);
				}
			});
		}
	}

	hideTabContent();
	showTabContent();



	//вешаем обработчик событий на область в которой находятся все табы и вызываем функцию проверки
	header.addEventListener('click', checkClass);

	header.addEventListener('keydown', event => {
		if (event.key === 'Enter') {
			checkClass(event);
		}
	});
};

export default tabsChooseBalcons;