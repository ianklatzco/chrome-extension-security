okay so i did some reading on chrome extensions over the weekend and i think the exploit chain would look like:

* get xss in example.com

* use xss to open up any HTML page exposed in web_accessible_resources, which has access to chrome.tabs 

* use chrome.tabs.executeScript to execute a "content script" in any open tab 
	* this is the hard one. it's hard to get from a standard webpage to being able to execute as chrome., unless the CSP is VERY broadly written (and chrome will block the worst of them)

* script contains a .append("<script>whatever</script>"), which attaches to DOM of otherwebsite.com etc & execs 

* yay, XSS in every open tab (subject to that tab's CSP / origin / HTTPOnly)

---

* google has pushed a new version of the extension "manifest" v3 that allows you to more tightly scope a bunch of things
* basically lets you allowlist specific domains
* the other potential vector, if web_accessible_resources is out, is message passing between the extension and the page
* but it requires that the message handler be written in a way that lets you execute code

---

extension should:
 * let u change the bgcolor of example.com
 * let u inject xss into example.com

 * demo: inject html into example.com
 * js is executed in the context of the page
 * we can access everyone else's cookies b/c we can talk to the background.html or inject.html via a window.open

 ---

* window.open is blocked which is good
* extension ID is fixed

the extension:
* programmatically injects html into the page
* will helpfully render text c:
