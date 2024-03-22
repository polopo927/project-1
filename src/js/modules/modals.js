//создаём структуру для экспорта в наш файл main.js
//создаём стрелочную функцию которая будет выполнять функцию
export const modals = () => {
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
		const scroll = calcScroll();
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
		const deleteDivScroll = () => {
			//убираем заменитель скролла при закрытии модалки
			document.body.style.marginRight = 0 + 'px';
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
				//добавляем заменитель скролла чтобы страница не прыгала при открытии модалки
				document.body.style.marginRight = scroll + 'px';
				//если в css присутствуют классы для показf и скрытия, можно использовать их
				//document.body.classList.add('modal-open')
			});
		});

		//навешиваем обработчик событий при клике на закрывающий элемент
		close.addEventListener('click', () => {
			closeModal();
			closeAllModal();
			deleteDivScroll();

			//если в css присутствуют классы для показы и скрытия, можно использовать их
			//document.body.classList.remove('modal-open')
		});
		//делаем функцию закрытия модалки при нажатии на область которая к ней не относится
		modal.addEventListener('click', (event) => {
			if (event.target === modal && closeClickOverlay) {
				closeModal();
				closeAllModal();
				deleteDivScroll();
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

	//создаём функцию которая при вызове модалок будет скрывать скролл станицы, чтобы она не прыгала
	const calcScroll = () => {
		//создаём див для того чтобы положить туда отступ который будет идентичен скроллу
		const div = document.createElement('div');

		//задаём ему ширину, высоту, скролл если элемент больше странциы и скрываем его
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		//пушим его в конец родителя
		document.body.appendChild(div);

		//вычисляем его ширину скролла
		//offsetWidth - ширина с прокруткой
		//clientWidth - ширина без прокрутки
		const scrollWidth = div.offsetWidth - div.clientWidth;
		//после получения ширины скролла, удаляем див
		div.remove();

		//вытаскиваем ширину скролла
		return scrollWidth;
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