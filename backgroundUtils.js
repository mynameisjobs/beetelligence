function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function MyRequest(path) {
  const httpRequest = new XMLHttpRequest();

  function send(data, callback) {
    httpRequest.onreadystatechange = handleStateChange(callback);
    httpRequest.open('POST', `${REMOTE_SERVER}${path}`);
    httpRequest.setRequestHeader('content-type', 'application/json');

    httpRequest.send(JSON.stringify(data));
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

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      resolve({latitude, longitude});
    });
  })
}
