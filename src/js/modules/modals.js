//создаём структуру для экспорта в наш файл main.js
//создаём стрелочную функцию которая будет выполнять функцию
const modals = () => {
	//отвечает за привязку нашего модального окна к триггеру
	//triggerSelector (например селектор нашей кнопки по которой будем кликать)
	//modalSelector говорит о том какое модальное окно мы будем открывать
	//closeSelector (селектор который будет закрывать наше модальное окно например крестик)
	const bindModal = ({
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	}) => {
		const triggers = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = document.querySelector(closeSelector);
		const windows = document.querySelectorAll('[data-modal]');
		const closeModal = () => {
			//обращаемся к модалке и скрываем её
			modal.style.display = 'none';
			//возвращаем прокрутку страницы
			document.body.style.overflow = '';
		}
		const closeAllModal = () => {
			windows.forEach(window => {
				//закрываем их
				window.style.display = 'none'
				document.body.style.overflow = '';
			});
		}

		//делаем перебор элементов так как используем queryselectorall
		triggers.forEach(trigger => {
			trigger.addEventListener('click', (event) => {
				//делаем условие, что если существует событие у элемента, то отменяем стандартную работу браузера для него
				if (event.target) {
					event.preventDefault();
				}

				closeAllModal();

				//показываем модальное окно
				modal.style.display = 'block';
				//блокируем прокрутку страницы когда модалка открыта
				document.body.style.overflow = 'hidden';
				//если в css присутствуют классы для показf и скрытия, можно использовать их
				//document.body.classList.add('modal-open')
			});
		});

		//навешиваем обработчик событий при клике на закрывающий элемент
		close.addEventListener('click', () => {
			closeModal();
			closeAllModal();

			//если в css присутствуют классы для показы и скрытия, можно использовать их
			//document.body.classList.remove('modal-open')
		});
		//делаем функцию закрытия модалки при нажатии на область которая к ней не относится
		modal.addEventListener('click', (event) => {
			if (event.target === modal && closeClickOverlay) {
				closeModal();
				closeAllModal();

				//если в css присутствуют классы для показы и скрытия, можно использовать их
				//document.body.classList.remove('modal-open')
			}
		});
	}

	//функция для открытия модалки, если пользователь находится на сайте определённое время
	//передаём селектор модалки и время через которое откроется модалка
	const showModalByTime = (selector, time) => {
		setTimeout(() => {
			document.querySelector(selector).style.display = 'block';
			//блокируем прокрутку страницы когда модалка открыта
			document.body.style.overflow = 'hidden';
		}, time);
	}

	bindModal({
		triggerSelector: '.popup_engineer_btn',
		modalSelector: '.popup_engineer',
		closeSelector: '.popup_engineer .popup_close',
	});
	bindModal({
		triggerSelector: '.phone_link',
		modalSelector: '.popup',
		closeSelector: '.popup .popup_close'
	});
	bindModal({
		triggerSelector: '.popup_calc_btn',
		modalSelector: '.popup_calc',
		closeSelector: '.popup_calc_close'
	});
	bindModal({
		triggerSelector: '.popup_calc_button',
		modalSelector: '.popup_calc_profile',
		closeSelector: '.popup_calc_profile_close',
		closeClickOverlay: false
	});
	bindModal({
		triggerSelector: '.popup_calc_profile_button',
		modalSelector: '.popup_calc_end',
		closeSelector: '.popup_calc_end_close',
		closeClickOverlay: false
	});
	//showModalByTime('.popup', 5000);
};

//для того чтобы этот код можно было экспортировать прописываем данную строчку
//где default это по умолчанию
export {modals};