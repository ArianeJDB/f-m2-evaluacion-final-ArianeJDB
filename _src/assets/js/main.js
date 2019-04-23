'use strict';

const field = document.querySelector('.field');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const apiBase = 'http://api.tvmaze.com/search/shows?q=';
const fav = [];
const favList = document.querySelector('.fav__list');

const search = () => {
  list.innerHTML = ' ';
  const api = apiBase + field.value;

  fetch(api)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const showItem = item.show;
        const showTitle = showItem.name;
        const showImages = showItem.image;
        // const showImage = showImages.medium;
        const image = document.createElement('img');
        const name = document.createElement('h2');
        const itemShow = document.createElement('li');
        itemShow.setAttribute('class', 'item');

        name.setAttribute('class', 'name');
        image.setAttribute('class', 'img');
        const nameText = document.createTextNode(showTitle);
        name.appendChild(nameText);
        // console.log('IMAGES', showImages);
        // console.log('MEDIUM', showImage);
        // console.log('showtitle', showTitle);

        itemShow.addEventListener('click', function(e) {
          const showImage = showImages.medium;
          favouriteShow(e, showTitle, showImage);
        }); //estos parametros se los pasa como "name" y como "image" a la funcion favouriteshow

        itemShow.appendChild(image);
        itemShow.appendChild(name);
        list.appendChild(itemShow);

        //-------------------------si no tiene foto
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
    });
};

function favouriteShow(e, name, image) {
  //aqui tenfo acceso al titulo de la pelicula de la peticion, la imagen y el evento del click

  const trigger = e.currentTarget;
  if (trigger.classList.contains('item')) {
    trigger.classList.remove('item');
    trigger.classList.add('item__favourite');
  } else {
    trigger.classList.add('item');
    trigger.classList.remove('item__favourite');
  }
  //-----------añadir al array vacío fav[]
  if (trigger.classList.contains('item__favourite')) {
    // const title = document.querySelector('h2');
    // const pic = document.querySelector('img');
    const obj = {
      title: name,
      pic: image
    };
    // console.log('ashjkalsjaklsja', obj);
    fav.push(obj);
  }

  //-----nuevos elementos para PINTAR la lista de favoritos
  const imageFav = document.createElement('img');
  const nameFav = document.createElement('h2');
  const liFav = document.createElement('li');
  imageFav.setAttribute('src', image);
  const nameText = document.createTextNode(name);
  nameFav.appendChild(nameText);
  liFav.appendChild(nameFav);
  liFav.appendChild(imageFav);
  favList.appendChild(liFav);

  localStorage.setItem('favs', JSON.stringify(fav));
  const getFavs = JSON.parse(localStorage.getItem('favs'));
  for (const items of getFavs) {
    console.log('items', items);
    console.log('yitutlo', getFavs.title);
    // favList.appendChild(items);
    
  }
 
  
}

btn.addEventListener('click', search);

// const getFavs= JSON.parse(localStorage.getItem('favs'));
// console.log('holA', getFavs.length);
