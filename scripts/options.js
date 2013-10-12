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

		if($('#url').val() == '') {
			$('h3').html('<i class="icon icon-bell"></i>' + chrome.i18n.getMessage('url_blank'));
		} else {
			options = {'url': $('#url').val()};
			chrome.storage.local.set(options);
			$('h3').html('<i class="icon icon-check"></i>' + chrome.i18n.getMessage('options_saved'));
			bg = chrome.extension.getBackgroundPage();
			bg.location.reload();
		}
	});
});
