/*  global variables set in backgroundConfigs.js:
 *    SUPPORTED_HOSTS, REMOTE_SERVER, PARSER_DICT
 *  Usable functions from backgroundUtils.js: 
 *    uuidv4, MyRequest, getLocation
 */

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ user_id: uuidv4() }, function() {
    console.log('Storing user_id');
  });

  getLocation().then(position => {
    chrome.storage.sync.set({ position }, function() {
      console.log('Storing init location info')
    })
  })

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

  if(msg.action === 'postSearchTerm') {
    const request = MyRequest('/searchterms');
    const search_term = msg.searchTerm;
    const source = msg.source;

    chrome.storage.sync.get('user_id', function(data) {
      request.send({ user_id: data.user_id, search_term, source }, (res) => {
        sendResponse({ response: 'ok' })
      })
    })

    return true;
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
    const request = MyRequest('/competitors');
    const data = msg.data;

    chrome.storage.sync.get(['user_id', 'position'], function(store) {
      const dataWithIDAndPosition = Array.isArray(data)
        ? data.map(x => ({ ...x, ...store.position, user_id: store.user_id }))
        : { ...data, ...store.position, user_id: store.user_id }

      request.send(dataWithIDAndPosition, (res) => {
        sendResponse({ data: JSON.parse(res.responseText) });
      })
    })

    return true;
  }

  if(msg.action === 'getDeliveredTime') {
    const store_ids = msg.store_ids;

    chrome.storage.sync.get('position', function(store) {
      const position = store.position;

      Promise.all(store_ids.map( store_id => MyRequest().sendPromise('/nexttimeslots', { store_id, ...position }) ))
        .then(docs => sendResponse(docs) )
        .catch(e => sendResponse([]))
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
