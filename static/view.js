const view = (function() {
  let _data = [];
  let _container = null;
  init();

  function init() {
    _container = document.createElement('div');
    _container.style.height = '200px';
    _container.style.width = '100%';
    _container.style.backgroundColor = '#ffcc01';
    _container.style.padding = '5px';
    _container.style.position = 'fixed';
    _container.style.bottom = '0';
    _container.style['overflow'] = 'auto';
    _container.style['white-space'] = 'nowrap';

    document.body.appendChild(_container);
  }

  function set(data) {
    _data = data;
  }

  function render() {
    //_container.appendChild(logoEle(_data.length));
    _data.map(d => productEle(d)).forEach(ele => _container.appendChild(ele));
  }

  function logoEle(count) {
    const ele = document.createElement('img');

    ele.style.position = 'fixed';
    ele.style.bottom = '180px';
    ele.style.left = '20px';
    ele.style.width = '50px';
    ele.style.height = '50px';
    ele.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Primary-logo.png/1200px-Primary-logo.png');
    
    return ele;
  }

  function productEle(data) {
    const ele = document.createElement('a');
    const title = document.createElement('div');
    const img = document.createElement('img');
    const price = document.createElement('div');
    title.innerHTML = data.title;
    title.style.margin = '10px 0 10px 10%';
    title.style.color = '#333';
    title.style['font-size'] = '18px';
    img.style.display = 'block';
    img.style.margin = 'auto';
    img.setAttribute('src', data.imageurl);
    img.style.width = '80%';
    img.style.height = '100px';
    price.innerHTML = `$ ${data.price}`;
    price.style.margin = '10px 0 10px 10%';
    price.style.color = 'red';
    price.style['font-size'] = '32px';
    price.style['font-weight'] = '800';
    ele.appendChild(price);
    ele.appendChild(img);
    ele.appendChild(title);

    ele.style.display = 'inline-block';
    ele.style.width = '280px';
    ele.style.height = '190px';
    ele.style.backgroundColor = '#fff';
    ele.style.borderRight = '#ddd 1px solid';
    ele.setAttribute('target', '_blank');
    ele.setAttribute('href', data.url);
    ele.addEventListener('mouseenter', () => {
      ele.style['box-shadow'] = '1px 0 0 0 #eec001, 0 1px 0 0 #eec001, 1px 1px 0 0 #eec001, inset 1px 0 0 0 #eec001, inset 0 1px 0 0 #eec001';
    });
    ele.addEventListener('mouseleave', () => {
      ele.style['box-shadow'] = '';
    });

    return ele;
  }

  return {
    set,
    render,
  }
})();
