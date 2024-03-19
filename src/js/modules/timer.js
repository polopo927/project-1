//создаём функции которая принимает в себя 2 аргумента
// timeSelector уникальный идентификатор куда мы будем подставлять этот таймер, возможно использовать селектор
// deadline до какого времени у нас будет идти таймер
const timer = (timeSelector, deadline) => {
	const getTimeRemaining = (endtime) => {
		// приводим всё к милисекундам и получаем разницу между концом таймера и сегодняшней датой
		// Date.parse(endtime) получаем конец таймера в милисекундах
		// Date.parse(new Date()) получаем сегодняшнюю дату в милисекундах
		const time = Date.parse(endtime) - Date.parse(new Date());
		// получаем секунды, делим всё время которое у нас вышло(в милисекундах) на 1000(это мы получаем секунды), а деление без остатка на 60 это мы получаем хвостик чтобы отобразить не 999999 секунд, а оставшееся время которое кратно 60 секундам
		const seconds = Math.floor(time / 1000 % 60);
		//получаем минуты, делим всё время которое у нас вышло(в милисекундах) на 1000(это мы получаем секунды), далее делим на 60 получаем минуты, а деление без остатка на 60 это мы получаем хвостик чтобы отобразить не 999999 минут, а оставшееся время которое кратно 60 минутам
		const minutes = Math.floor((time / 1000 / 60) % 60);
		//получаем часы, делим всё время которое у нас вышло(в милисекундах) на 1000(это мы получаем секунды), далее делим на 60 получаем минуты, далее делим это на 60 получаем часы, а деление без остатка на 24 это мы получаем хвостик чтобы отобразить не 999999 часов, а оставшееся время которое кратно 24 часам
		const hours = Math.floor((time / 1000 / 60 / 60) % 24);
		//получаем дни, делим всё время которое у нас вышло(в милисекундах) на 1000(это мы получаем секунды), далее делим на 60 получаем минуты, далее делим это на 60 получаем часы и делим на 24 это мы получаем дни
		const days = Math.floor(time / 1000 / 60 / 60 / 24);

		return {
			'total': time,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	};

	//создаём функцию которая добавляет 0 перед числами меньше 10 например 04, 05, 07...
	const addZero = (num) => {
		if (num <= 9) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	//функция для помещения определённого времени в определённый элемент на странице
	const setClock = (timeSelector, endtime) => {
		const timer = document.querySelector(timeSelector);
		const days = document.querySelector('#days');
		const hours = document.querySelector('#hours');
		const minutes = document.querySelector('#minutes');
		const seconds = document.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000);

		//вызываем функцию заранее для того чтобы отсчёт таймера пошёл сразу
		updateClock();

		//создаём функцию которая меняет все элементы на странице
		function updateClock () {
			const time = getTimeRemaining(endtime);

			//присваиваем каждому элементу соответсвующее вермя
			days.textContent = addZero(time.days);
			hours.textContent = addZero(time.hours);
			minutes.textContent = addZero(time.minutes);
			seconds.textContent = addZero(time.seconds);

			//если время таймера закончилось выставляем его по 00
			if (time.total <= 0) {
				days.textContent = '00';
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';

				//останавливаем таймер
				clearInterval(timeInterval);
			}
		};
	};
	setClock(timeSelector, deadline);
};

export default timer;