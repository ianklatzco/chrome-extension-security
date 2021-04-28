// get the chrome-extension:// url
// pull the HTML from it
// inject it into the webpage
fetch(chrome.runtime.getURL('inject.html')).then(r => r.text()).then(html => {
  document.body.insertAdjacentHTML('beforebegin', html);
  // not using innerHTML as it would break js event listeners of the page
});
