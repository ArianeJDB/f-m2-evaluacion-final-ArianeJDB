'use strict';

console.log('>> Ready :)');

const field = document.querySelector('.field');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const apiBase = 'http://api.tvmaze.com/search/shows?q=';

const search = () => {
  const api = apiBase + field.value;
  fetch(api)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const showItem = item.show;
        const showTitle = showItem.name;
        const showImages = showItem.image;

        const image = document.createElement('img');
        const name = document.createElement('h2');
        const itemShow = document.createElement('li');
        itemShow.setAttribute('class', 'item');

        name.setAttribute('class', 'name');
        const nameText = document.createTextNode(showTitle);
        name.appendChild(nameText);
        itemShow.appendChild(image);
        itemShow.appendChild(name);
        list.appendChild(itemShow);
        //si no tiene foto
        if (showImages === null) {
          image.setAttribute(
            'src',
            'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
          );
        } else if (showImages !== null) {
          const showImage = showImages.medium;
          image.setAttribute('src', `${showImage}`);
        }
      }
      const li = document.querySelectorAll('.item');
      for (const liItem of li) {
        const favouriteShow = e => {
          const trigger = e.currentTarget;
          if (trigger.classList.contains('item')) {
            trigger.classList.remove('item');
            trigger.classList.add('item__favourite');
          } else {
            trigger.classList.add('item');
            trigger.classList.remove('item__favourite');
          }
        };
  
        liItem.addEventListener('click', favouriteShow);
      }

      
    });
};

btn.addEventListener('click', search);
