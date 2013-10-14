var options;

$(document).ready(function() {
	chrome.storage.local.get(null, function(cfg) {
		$('#url').val(cfg.url);
	});

	var data = {'send': chrome.i18n.getMessage('send'), 'options': chrome.i18n.getMessage('options')};
	var template = $('article').html();
	var html = Mustache.to_html(template, data);
	$('article').html(html);

	$('form').bind('submit', function(event) {
		event.preventDefault();

		url_to_save = $('#url').val();
		if(url_to_save == '') {
			$('h3').html('<i class="icon icon-bell"></i>' + chrome.i18n.getMessage('url_blank'));
		} else {
			if(url_to_save.slice(-1) === '/') {
				url_to_save = url_to_save.slice(0, -1);
				$('#url').val(url_to_save);
			}

			options = {'url': url_to_save};
			chrome.storage.local.set(options);
			$('h3').html('<i class="icon icon-check"></i>' + chrome.i18n.getMessage('options_saved'));
			bg = chrome.extension.getBackgroundPage();
			bg.location.reload();
		}
	});
});
