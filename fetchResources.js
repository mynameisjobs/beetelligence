/* Page action script
 *
 * 1. Get config variables from background.js: REMOTE_SERVER, PARSER_DICT
 * 2. Append view.js from remote server. Only append when not existed yet.
 * 3. Append parser script based on the domain everytime when pageAction is clicked.
 *
 */

(function() {
  chrome.runtime.sendMessage({ action: 'getConfigs' }, (response) => {
    const { REMOTE_SERVER, PARSER_DICT } = response;
    const VIEW_ID = 'my-view-script';
    const PARSER_ID = 'my-parser-script';

    function injectExtensionID() {
      const id = chrome.runtime.id;

      const s = document.createElement('script');
      s.innerHTML = 'window.beecheaperID = "' + id + '"';
      document.body.appendChild(s);
    }

    function isAppendedBefore(id) {
      return document.querySelectorAll(`#${id}`).length !== 0;
    }

    function appendJS(id) {
      var element = document.createElement('script');
      var host = document.location.host;

      element.setAttribute("id", id);
      if(id === VIEW_ID) {
	element.setAttribute("src", `${REMOTE_SERVER}/static/view.js`);
      }
      if(id === PARSER_ID) {
	element.setAttribute("src", `${REMOTE_SERVER}/static/${PARSER_DICT[host]}`); 
      }

      document.body.appendChild(element)
    }

    function removeJS(id) {
      document.getElementById(id).remove();
    }

    injectExtensionID()

    isAppendedBefore(VIEW_ID)
      ? null
      : appendJS(VIEW_ID)

    isAppendedBefore(PARSER_ID)
      ? (() => {
	  removeJS(PARSER_ID);
	  appendJS(PARSER_ID);
	})()
      : appendJS(PARSER_ID)
  })
})();
