var options;
var feedData = {};

chrome.storage.local.get(null, function(cfg) {
	if(cfg) {
		options = cfg;

		if(options.saved_version) {
			saved_version_compare = options.saved_version;
		} else {
			saved_version_compare = '1.1';
		}

		var manifestData = chrome.app.getDetails();
		current_version = manifestData.version;
		chrome.storage.local.set( {'saved_version': current_version} );

		if(saved_version_compare != current_version) {
			var options_notification = {
				'type': 'basic',
				'title': 'Reader Self Feeder',
				'message': chrome.i18n.getMessage('note_updated', current_version),
				'iconUrl': '/medias/readerself_48x48.png'
			};
			chrome.notifications.create('note_updated', options_notification, function() {
			});
		}

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
		} else {
			if(!options.note_installation) {
				chrome.storage.local.set( {'note_installation': true} );

				var options_notification = {
					'type': 'basic',
					'title': 'Reader Self Feeder',
					'message': chrome.i18n.getMessage('note_installation'),
					'iconUrl': '/medias/readerself_48x48.png'
				};
				chrome.notifications.create('note_installation', options_notification, function() {
				});
			}
		}
	}
});
