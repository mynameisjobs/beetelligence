(function() {
  const extension_id = 'jagbamlhmfmhepenohcecakjnglojfal';

  function parseData() {
    const now = new Date();
    const docs = []
    document.querySelectorAll('.item-wrap.border-grey.bg-white').forEach(x => {
      try {
        const updated_at = now.toISOString();
        const title = x.querySelector('h2').innerText;
        const imageurl = x.querySelector('img').src;
        const url = x.href.split('#')[0];
        const price = x.querySelector('.food123.price').innerText;

        docs.push({ url, title, imageurl, price,  updated_at, source: 'food123' });
      }catch(e) {
        console.log(e);
      }
    })
    return docs
  }

  const data = parseData();

  chrome.runtime.sendMessage(extension_id, { action: "postData", data: data }, (response) => {
    view.set(response.data);
    view.render();
  })
 
})();
