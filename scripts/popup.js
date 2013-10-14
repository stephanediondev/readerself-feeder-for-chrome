var BGPage = chrome.extension.getBackgroundPage();
if(typeof BGPage.feeds !== undefined) {
	$('ul').html('');
	for(i in BGPage.feeds) {
		if(!BGPage.feeds[i].title) {
			BGPage.feeds[i].title = BGPage.feeds[i].href;
		}
		$('ul').append('<li style="margin-bottom:5px;"><a href="' + BGPage.feeds[i].href + '" style="outline:none;text-decoration:none;white-space:nowrap;"><i class="icon icon-plus"></i>' + BGPage.feeds[i].title + '</a></li>');
	}

	var data = {'feeds': chrome.i18n.getMessage('feeds')};
	var template = $('article').html();
	var html = Mustache.to_html(template, data);
	$('article').html(html);
}

$('ul a').live('click', function(event) {
	href = $(this).attr('href');
	chrome.tabs.create({ url: BGPage.url_feed + '/?u=' + href });
});
