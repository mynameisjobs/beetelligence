(function() {
  try {
    const qs = document.location.search.split('?')[1];
    const kvpairs = qs.split('&');

    kvpairs
      .filter(pair => pair.split('=')[0] === 'q')
      .map(pair => {
        const searchTerm = decodeURIComponent(pair.split('=')[1]);

        chrome.runtime.sendMessage({ action: 'postSearchTerm', searchTerm: searchTerm, source: 'food123' }, (response) => {
          console.log(response)
        })
      })
  }catch(e) {
    console.log(e)
  }
})()
