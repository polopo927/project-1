const formsFeedback = () => {
	const forms = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');
	const messageFromUser = {
		loading: 'Загрузка...',
		success: 'Спасибо, скоро с Вами свяжутся',
		fail: 'Что-то пошло не так'
	}

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = messageFromUser.loading
		//Метод fetch() в JavaScript предоставляет возможность асинхронно отправлять сетевые запросы и получать ответы.
		let result = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await result.text();
	}

	//создаём функцию очистки инпутов
	const clearInputs = () => {
		//перебираем массив инпутов
		inputs.forEach(input => {
			//устанавливаем пустое значение для каждого инпута, это очистит его
			input.value = '';
		})
	}

	//перебираем массив с формами
	forms.forEach(form => {
		//навешиваем обработчик событий с подтверждением submit
		//event здесь нужен для того чтобы отключить перезагрузку страницы при отправке формы
		form.addEventListener('submit', (event) => {
			//чтобы отключить перезагрузку страницы при отправке формы, отключаем дэфолтную работу браузера для события
			event.preventDefault();

			//служит для отображения статуса запроса
			//создаём переменную где будут храниться данные из формы
			let statusMessage = document.createElement('div');
			//преукрасим форму с помощью добавления стилей селектора status
			statusMessage.classList.add('status');
			//помещаем блок на страницу, так как сейчас она находится только в js 
			form.appendChild(statusMessage);

			const formData = {};
			inputs.forEach(input => {
				formData[input.name] = input.value;
			})
			const jsonData = JSON.stringify(formData)

			postData('https://simple-server-cumz.onrender.com/api/data', jsonData)
				.then(result => {
					console.log(result)
					statusMessage.textContent = messageFromUser.success
				})
				.catch(() => {
					statusMessage.textContent = messageFromUser.fail
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				})
		})
	})
}

export default formsFeedback