function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function MyRequest(path) {
  const httpRequest = new XMLHttpRequest();

  function send(data, callback) {
    const qs = '?data=' + JSON.stringify(data);

    httpRequest.onreadystatechange = handleStateChange(callback);
    httpRequest.open('GET', `${REMOTE_SERVER}${path}${qs}`);
    httpRequest.send();
  }

  function handleStateChange(callback) {
    return function() {
      if(httpRequest.readyState === 4) {
        callback(httpRequest)
      }
    }
  }

  return {
    send,
  }
}

