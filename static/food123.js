function run() {
  const extension_id = window.beecheaperID;

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

  function parseDetail() {
    const now = new Date();
    const source = 'food123';
    const price = document.querySelector('.site-color.big-price').innerText;
    const title = document.querySelector('h1.title').innerText;
    const imageurl = document.querySelector('img.item-img').src;
    const updated_at = now.toISOString();
    const url = document.location.href.split('#')[0];

    return { source, title, price, url, imageurl, updated_at };
  }

  const pageUrl = document.location.href;
  const data = pageUrl.includes('https://www.food123.com.tw/site/sku')
    ? parseDetail()
    : parseData()

  chrome.runtime.sendMessage(extension_id, { action: "postData", data: data }, (response) => {
    const store_ids = response.data.map(x => x.store_id);

    chrome.runtime.sendMessage(extension_id, { action: "getDeliveredTime", store_ids }, (deliveredTimes) => {
      view.init();
      view.set( response.data.map((d, index) => ({...d, ...deliveredTimes[index]})) );
      view.render();
    })
  })
 
}

try {
  run()
}catch(e) {
  setTimeout(run, 1000)
}
