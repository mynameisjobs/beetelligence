(function() {
  try {
    const qs = document.location.search.split('?')[1];
    const kvpairs = qs.split('&');

    kvpairs
      .filter(pair => pair.split('=')[0] === 'qry')
      .map(pair => {
        const searchTerm = decodeURIComponent(pair.split('=')[1]);

        chrome.runtime.sendMessage({ action: 'postSearchTerm', searchTerm: searchTerm }, (response) => {
          console.log(response)
        })
      })
  }catch(e) {
    console.log(e)
  }
})()
