// if the page matches the allowed URL
// show the "page action" i.e. popup
// mostly not used

// ------

// https://developer.chrome.com/extensions/getstarted

// a "background script" must be "registered" in the manifest

// once added to manifest, chrome://extensions shows "Inspect views: background page"

/* background.html is:
  <html><head></head><body>
  <script src="background.js"></script>
  </body></html>
*/

// now we add an "onInstalled" listener
// sets a value in browser storage
// https://developer.chrome.com/apps/storage
// "User data can be automatically synced with Chrome sync"
// chrome.storage.sync: notably you can store data as objects (instead of localstorage's strings only)

let allowed_hostname = 'example.com';

  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
	// declarativeContent takes action based on page content without reading the page.
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        // if the page matches the allowed, show the "page action" i.e. popup, 
        conditions:
        [
          new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: allowed_hostname},})
        ],
        actions:
        [
          new chrome.declarativeContent.ShowPageAction()
        ]
      }]);
    });
  });

