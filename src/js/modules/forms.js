import {checkNumInputs} from './index'

export const formsFeedback = (state) => {
	const forms = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');
	const windows = document.querySelectorAll('[data-modal]');
	const messageFromUser = {
		loading: 'Загрузка...',
		success: 'Спасибо, скоро с Вами свяжутся',
		failure: 'Что-то пошло не так'
	};

	const closeAllModal = () => {
		windows.forEach(window => {
			//закрываем их
			window.style.display = 'none'
			document.body.style.overflow = '';
		});
	}

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = messageFromUser.loading;
		//Метод fetch() в JavaScript предоставляет возможность асинхронно отправлять сетевые запросы и получать ответы.
		const result = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: data
		});

		return await result.text();
	};

	//создаём функцию очистки инпутов
	const clearInputs = () => {
		//перебираем массив инпутов
		inputs.forEach(input => {
			//устанавливаем пустое значение для каждого инпута, это очистит его
			input.value = '';
		});
	};

	checkNumInputs('input[name="user_phone"]');

	//перебираем массив с формами
	forms.forEach(form => {
		//навешиваем обработчик событий с подтверждением submit
		//event здесь нужен для того чтобы отключить перезагрузку страницы при отправке формы
		form.addEventListener('submit', event => {
			//чтобы отключить перезагрузку страницы при отправке формы, отключаем дэфолтную работу браузера для события
			event.preventDefault();

			//служит для отображения статуса запроса
			//создаём переменную где будут храниться данные из формы
			const statusMessage = document.createElement('div');
			//преукрасим форму с помощью добавления стилей селектора status
			statusMessage.classList.add('status');
			//помещаем блок на страницу, так как сейчас она находится только в js 
			form.appendChild(statusMessage);

			const formData = new FormData(form)
			if (form.getAttribute('data-calc') == 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}
			const jsonObject = {};
			formData.forEach((value, key) => {
				jsonObject[key] = value;
			});
			const jsonData = JSON.stringify(jsonObject);
			postData('https://simple-server-cumz.onrender.com/api/data', jsonData)

				.then(() => {
					statusMessage.textContent = messageFromUser.success
				})
				.catch(() => {
					statusMessage.textContent = messageFromUser.failure
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						closeAllModal();
					}, 2000);
				})
		})
	})
}

