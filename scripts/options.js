var options;

$(document).ready(function() {
	chrome.storage.local.get(null, function(cfg) {
		$('#url').val(cfg.url);
	});
	$('form').bind('submit', function(event) {
		event.preventDefault();

		if($('#url').val() == '') {
			$('h3').html('<i class="icon icon-bell"></i>URL cannot be blank!');
		} else {
			options = {'url': $('#url').val()};
			chrome.storage.local.set(options);
			$('h3').html('<i class="icon icon-check"></i>Options saved successfully.');
			bg = chrome.extension.getBackgroundPage();
			bg.location.reload();
		}
	});
});
