const checkNumInputs = (inputPhone) => {
	const phoneNumberInputs = document.querySelectorAll(inputPhone);

	phoneNumberInputs.forEach(input => {
		input.addEventListener('input', () => {
			input.value = input.value.replace(/\D/g, '');
		});
	});
}

export default checkNumInputs