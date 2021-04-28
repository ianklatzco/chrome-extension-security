  let changeColor = document.getElementById('changeColor');

  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// "programmatically injected content script"
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: `

            function getCookie(name) {
              const value = '; ' + document.cookie;
              const parts = value.split('; ' + name);
              if (parts.length === 2) return parts.pop().split(';').shift().replace('=','');
            }

            // document.body.style.backgroundColor = "' + color + '";
            //document.getElementsByTagName("div")[0];
            // text_node.innerHTML = '<script>alert(1)</script>';
            // let text_node = document.createTextNode('"><script>alert(1)</script>');
            // document.body.appendChild(text_node)

            // working snippet to pop an alert box
            // let element = document.createElement("script")
            // var foo = document.createElement("script")
            // foo.innerHTML="alert(1)"
            // document.body.append(foo)

            // maybe instead of appending a thing i should pull from localstorage etc something xss-able
            // yeah okay so let's make an extension that adds a text box to example.com that writes to local storage
            // and then have that re-rendered to the page when you open it
            // and that's XSS in the page's context
            // and then we use the browser to escalate privs

            // Nodes apparently strictly newer than Elements

            // create a text box
            // var div = document.createElement("div");

            // var textbox = document.createElement("textarea");
            // textbox.setAttribute('id', 'input');
            // textbox.setAttribute('style', "height: 200px; width: 400px;");

            // var button = document.createElement("button");
            // button.setAttribute('type', 'button');
            // button.innerHTML = "run code";

            // var outbox = document.createElement("p");
            // outbox.setAttribute('id', 'output');
            // outbox.setAttribute('style', "height: 200px; width: 400px;");
            // outbox.innerHTML = getCookie('hello');

            // div.append(textbox)
            // div.append(document.createElement("br"))
            // div.append(button)
            // div.append(document.createElement("br"))
            // div.append(outbox)
            // document.body.prepend(div)

            // save box A to a cookie
            // redraw it
            // button code: appendChild 

      `});
    });
  };
