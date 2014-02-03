	document.addEventListener('click', _onMouseClick, false);
	
	/**
	 * Обработчик клика по ссылке с классом 'popup-link'
	 * @param {Event} e событие клика
	 * @private
	 */
	function _onMouseClick(e) {
		if (e.target.className == 'popup-link' ) {
			e.preventDefault();
			openPopupFromLink(e.target);
		}
	}

	/**
	 * Получает данные из ссылки
	 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
	 * @param {HTMLElement} link Ссылка с data-аттрибутами
	 */
	function openPopupFromLink(link) {
		var linkh = link.href;
		createPopup(
			link.dataset.title,
			link.dataset.message.replace('%s', linkh),
			function () { 
				return window.location = linkh;
			}
		);
	}

	/**
	 * Создаёт DOM-узел с сообщением
	 * @param {String} title Заголовок сообщение
	 * @param {String} message Текст сообщения сообщение
	 * @param {Function} onOk Обработчик клика по кнопке 'Да'
	 */
	 
	function createPopup(title, message, onOk) {
	if (document.getElementsByClassName('preview').length == 0) {
		document.getElementsByClassName('bg')[0].style.display = 'block';
		var alert_message = document.createElement('div');
		alert_message.className = 'preview';
		alert_message.innerHTML ='<h2 class="preview_title">' +title + '</h2><p class="preview_message">' + message + '</p><p class="preview_buttons"><input type="submit" name="ok" value="Да"><input type="submit" name="no" value="Нет"></p>';
		document.body.appendChild(alert_message);
	} else {
		document.getElementsByClassName('preview')[0].children[0].innerHTML = title;
		document.getElementsByClassName('preview')[0].children[1].innerHTML = message;
		document.getElementsByClassName('preview')[0].style.display = 'block';
		document.getElementsByClassName('bg')[0].style.display = 'block';
	}
	
	document.getElementsByTagName('INPUT')[0].addEventListener('click', onOk, false);
	document.getElementsByTagName('INPUT')[1].addEventListener('click', function() {
		document.getElementsByClassName('preview')[0].style.display = 'none';
		document.getElementsByClassName('bg')[0].style.display = 'none';
	}, false);
	
}

