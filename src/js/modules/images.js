//создаём функцию которая будет помещать наши изображения в модальное окно  и делать прозрачность по бокам
export const images = () => {
	//создаём div для помещения в него изображения
	const imgPopup = document.createElement('div');
	//получаем родителя наших изображений
	const workSection = document.querySelector('.works');
	//создаём img 
	const bigImage = document.createElement('img');

	//добавляем к нашему диву селектор popup(модалка)
	imgPopup.classList.add('popup');
	//добавляем к нашим изображениям этот див с модалкой
	workSection.appendChild(imgPopup);

	//размещаем див с модалкой по центру экрана
	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	const hideImg = () => {
		imgPopup.style.display = 'none';
	}


	//помещаем в наш див модалку новосозданные изображения
	imgPopup.appendChild(bigImage);

	//вешаем обработчик события на родителя с изображениями
	workSection.addEventListener('click', (event) => {
		//убираем дефолтную работу браузера, чтобы он не открывал ссылки с изображениями
		event.preventDefault();

		const target = event.target;
		//проверяем есть ли у изображения на которое нажали эвент таргет и есть ли у него класс preview
		if (target && target.classList.contains('preview')) {
			//присваиваем дисплею flex
			imgPopup.style.display = 'flex';
			//создаём переменную и получаем родителя изображения с ссылкой
			const path = target.parentNode.getAttribute('href');
			console.log(path)
			//присваиваем нашему img путь к картинке который получили у родителя картинки, для открытия по ней модалки
			bigImage.setAttribute('src', path);
			console.log(bigImage)
		}

		//если пользователь кликнул не на изображение, а на подложку, проверяем это с помощью (совпадение)matches(который с дивом и классом попап)
		if (target && target.matches('div.popup')) {
			hideImg();
		}
	});
};