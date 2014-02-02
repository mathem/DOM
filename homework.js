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
		var title = link.dataset.title;
		var message = link.dataset.message;
		var linkh = link.href;
		message = message.replace('%s', linkh);
		var onOk = function () {
			return window.location = link.href;
		}
		
		createPopup(title, message, onOk);
	}

	/**
	 * Создаёт DOM-узел с сообщением
	 * @param {String} title Заголовок сообщение
	 * @param {String} message Текст сообщения сообщение
	 * @param {Function} onOk Обработчик клика по кнопке 'Да'
	 * @returns {HTMLElement}
	 */
	function createPopup(title, message, onOk) {
	if ( document.getElementsByClassName('preview').length == 0) {
		var alert_message = document.createElement('div');
		document.body.style.background = 'rgba(43, 31, 27, .9)';
		alert_message.className = 'preview';
		alert_message.innerHTML ='<h2 class="preview_title">' +title + '</h2><p class="preview_message">' + message + '</p><p class="preview_buttons"><input type="submit" name="ok" value="Да"><input type="submit" name="no" value="Нет"></p>';
		document.body.appendChild(alert_message);
		var width_block = document.getElementsByClassName('preview')[0].offsetWidth
		var height_block = document.getElementsByClassName('preview')[0].offsetHeight;
		var ok_button = document.getElementsByName('ok')[0];
		var no_button = document.getElementsByName('no')[0];
		document.getElementsByClassName('preview')[0].style.marginLeft = width_block*(-0.5) + 'px';
		document.getElementsByClassName('preview')[0].style.marginTop = height_block*(-0.5) + 'px';
		ok_button.addEventListener('click', onOk, false);
		no_button.addEventListener('click', function() {
			document.body.removeChild(alert_message);
			document.body.style.background = '#ffffff';
		}, false);
		return (alert_message);
	}
	
	}

