(function() {
  //const extension_id = 'jagbamlhmfmhepenohcecakjnglojfal';
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
    const source = 'shopee';
    const price = document.querySelector('.shopee-product-info__header__real-price').innerText.split("-").length == 1 ? document.querySelector('.shopee-product-info__header__real-price').innerText.split("-")[0]:document.querySelector('.shopee-product-info__header__real-price').innerText.split("-")[1];
    const title = document.querySelector('h1.shopee-product-info__header__text').innerText;
    const imageurl = document.querySelector('div._2yRSuO').style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
    const updated_at = now.toISOString();
    const url = document.location.href.split('#')[0];

    return { source, title, price, url, imageurl, updated_at };
  }

  const pageUrl = document.location.href;
  const data = parseDetail();

  chrome.runtime.sendMessage(extension_id, { action: "postData", data: data }, (response) => {
    view.init();
    view.set(response.data);
    view.render();
  })
 
})();
