/*  global variables set in backgroundConfigs.js:
 *    SUPPORTED_HOSTS, REMOTE_SERVER, PARSER_DICT
 *  Usable functions from backgroundUtils.js: 
 *    uuidv4, MyRequest, getLocation
 */

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ user_id: uuidv4() }, function() {
    console.log('Setting user_id');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: SUPPORTED_HOSTS.map(host => 
        new chrome.declarativeContent.PageStateMatcher({ pageUrl: {hostEquals: host} })
      ),
      actions: [
        new chrome.declarativeContent.ShowPageAction(),
      ]
    }]);
  });

});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log("[Info] Receive message", msg);
  console.log("[Info] from", sender);

  if(msg.action === 'getConfigs') {
    sendResponse({ REMOTE_SERVER, PARSER_DICT })
  }
})

chrome.runtime.onMessageExternal.addListener(function(msg, sender, sendResponse) {
  console.log("[Info] Receive external message", msg);
  console.log("[Info] from", sender);

  if(msg.action === 'getUserId') {
    chrome.storage.sync.get('user_id', function(data) {
      sendResponse({ user_id: data.user_id });
    })
    return true;
  }
  if(msg.action === 'postData') {
    const request = MyRequest('/competitor_prices');
    const data = msg.data;

    getLocation().then(position => {
      chrome.storage.sync.get('user_id', function(store) {
        const dataWithIDAndPosition = Array.isArray(data)
          ? data.map(x => ({ ...x, ...position, user_id: store.user_id }))
          : { ...data, ...position, user_id: store.user_id }

        request.send(dataWithIDAndPosition, (res) => {
          sendResponse({ data: JSON.parse(res.responseText) });
        })
      })
    })

    return true;
  }
  return;
});

chrome.pageAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    file: 'fetchResources.js'
  })
})