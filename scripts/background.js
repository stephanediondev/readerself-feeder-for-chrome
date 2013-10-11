var options;
var feedData = {};

chrome.storage.local.get(null, function(cfg) {
	if(cfg) {
		options = cfg;

		if(options.url) {
			chrome.extension.onRequest.addListener(function(request, sender) {
				if(request.msg == 'feedIcon') {
					var input = [];
					for(var i=0;i<request.feeds.length;++i) {
						var a = document.createElement('a');
						a.href = request.feeds[i].href;
						if(a.protocol == 'http:' || a.protocol == 'https:') {
							input.push(request.feeds[i]);
						}
					}
				
					if(input.length > 0) {
						feedData[sender.tab.id] = input;

						window.feeds = input;
						window.url_feed = options.url;

						chrome.pageAction.show(sender.tab.id);
					}
				}
			});
		}
	}
});
