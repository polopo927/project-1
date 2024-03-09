//создаём структуру для экспорта в наш файл main.js
//создаём стрелочную функцию которая будет выполнять функцию
const modals = () => {
	//отвечает за привязку нашего модального окна к триггеру
	//triggerSelector (например селектор нашей кнопки по которой будем кликать)
	//modalSelector говорит о том какое модальное окно мы будем открывать
	//closeSelector (селектор который будет закрывать наше модальное окно например крестик)
	function bindModal(triggerSelector, modalSelector, closeSelector) {
		const trigger = document.querySelectorAll(triggerSelector),
			  modal = document.querySelector(modalSelector),
			  close = document.querySelector(closeSelector);
		//делаем перебор элементво так как используем queryselectorall
		trigger.forEach(item => {
			item.addEventListener('click', (event) => {
				//делаем условие, что если существует событие у элемента, то отменяем стандартную работу браузера для него
				if (event.target) {
					event.preventDefault();
				}

				//показываем модальное окно
				modal.style.display = 'block';
				//блокируем прокрутку страницы когда модалка открыта
				document.body.style.overflow = 'hidden';
				//если в css присутствуют классы для показы и скрытия, можно использовать их
				//document.body.classList.add('modal-open')
			});
		});

		//навешиваем обработчик событий при клике на закрывающий элемент
		close.addEventListener('click', () => {
			//обращаемся к модалке и скрываем её
			modal.style.display = 'none';
			//возвращаем прокрутку страницы
			document.body.style.overflow = '';
			//если в css присутствуют классы для показы и скрытия, можно использовать их
			//document.body.classList.remove('modal-open')
		});
		//делаем функцию закрытия модалки при нажатии на область которая к ней не относится
		modal.addEventListener('click', (event) => {
			if (event.target === modal) {
				//обращаемся к модалке и скрываем её
				modal.style.display = 'none';
				//возвращаем прокрутку страницы
				document.body.style.overflow = '';
				//если в css присутствуют классы для показы и скрытия, можно использовать их
				//document.body.classList.remove('modal-open')
			}
		});
	}

	//функция для открытия модалки, если пользователь находится на сайте определённое время
	//передаём селектор модалки и время через которое откроется модалка
	function showModalByTime(selector, time) {
		setTimeout(() => {
			document.querySelector(selector).style.display = 'block';
			//блокируем прокрутку страницы когда модалка открыта
			document.body.style.overflow = 'hidden';
		}, time);
	}

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	showModalByTime('.popup', 5000);
};

//для того чтобы этот код можно было экспортировать прописываем данную строчку
//где default это по умолчанию
export default modals;