const view = (function() {
  let _data = [];
  let _container = null;

  function init() {
    if(_container) {
      remove();
    }
    _container = document.createElement('div');
    _container.style.height = '210px';
    _container.style.width = '100%';
    _container.style.backgroundColor = '#ffcc01';
    _container.style.padding = '5px';
    _container.style.position = 'fixed';
    _container.style.bottom = '0';
    _container.style['overflow'] = 'auto';
    _container.style['white-space'] = 'nowrap';
    _container.style['z-index'] = '1000';

    document.body.appendChild(_container);
  }

  function remove() {
    _container.remove();
  }

  function set(data) {
    _data = data;
  }

  function render() {
    _container.appendChild(closeBtn());
    _data.map(d => productEle(d)).forEach(ele => _container.appendChild(ele));
  }

  function closeBtn() {
    const ele = document.createElement('div');
    
    ele.style.position = 'fixed';
    ele.style.bottom = '180px';
    ele.style.right = '10px';
    ele.style.width = '12px';
    ele.style.height = '12px';
    ele.style['background-color'] = '#eee';
    ele.style.cursor = 'pointer';

    ele.innerHTML = 'X';
    ele.addEventListener('click', remove);

    return ele;
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
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const deliverTime = startDate.toLocaleDateString().split('/').slice(1, 3).join('/') + ' ' +startDate.getHours() + '~' + endDate.getHours() + '可送達'

    const ele = document.createElement('a');
    const title = document.createElement('div');
    const deliver = document.createElement('div');
    const img = document.createElement('img');
    const price = document.createElement('div');
    title.innerHTML = data.title;
    title.style.margin = '10px 0 10px 10%';
    title.style.color = '#333';
    title.style['font-size'] = '18px';
    deliver.innerHTML = deliverTime;
    deliver.style.display = 'inline-block';
    deliver.style.width = '50%';
    deliver.style.maringLeft = '5%';
    img.style.display = 'block';
    img.style.margin = 'auto';
    img.setAttribute('src', data.imageurl);
    img.style.width = '80%';
    img.style.height = '100px';
    price.innerHTML = `$ ${data.price}`;
    price.style.display = 'inline-block';
    price.style.width = '35%';
    price.style.margin = '10px 0 10px 10%';
    price.style.color = 'red';
    price.style['font-size'] = '24px';
    price.style['font-weight'] = '800';
    ele.appendChild(price);
    ele.appendChild(deliver);
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
    init,
    remove,
    set,
    render,
  }
})();
