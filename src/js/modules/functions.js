/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

export function bsoAnalysis () {
	const AnalysisEls = document.querySelectorAll('.bso-analys');

	AnalysisEls.forEach(element => element.addEventListener('click', switchAnalysis));

	function switchAnalysis(e) {

		if (this.classList.contains('bso-analys--active')) {
			this.classList.remove('bso-analys--active');
			document.querySelector('.bso-analys-info').remove()
		} else {
			AnalysisEls.forEach(element => element.classList.remove('bso-analys--active'));
			this.classList.add('bso-analys--active');

			if (document.querySelector('.bso-analys-info')) {
				document.querySelector('.bso-analys-info').remove()
			}

			let indexElement = 1;

			AnalysisEls.forEach((element, index = 0) => {
				if (element.classList.contains('bso-analys--active')) { indexElement = index + 1; }
				index = index + 1
			});

			let itemsInLine = 1;

			if (window.innerWidth >= 998) {
				itemsInLine = 3;
			} else if (window.innerWidth >= 768) {
				itemsInLine = 2;
			} else {
				itemsInLine = 1;
			}

			let currentLine = 0;

			if (indexElement % itemsInLine != 0) {
				currentLine = Math.floor(indexElement / itemsInLine) + 1;
			} else {
				currentLine = indexElement / itemsInLine;
			}

			let endLineElId = currentLine * itemsInLine;
				
			if (endLineElId > AnalysisEls.length) {
				endLineElId = AnalysisEls.length;
			}

			document.querySelectorAll('.bso-analys')[endLineElId - 1].insertAdjacentHTML("afterEnd", "<div class='bso-analys-info'>" + this.querySelector('.bso-analys-hidden-info').innerHTML + "</div>");
		}
	}
}