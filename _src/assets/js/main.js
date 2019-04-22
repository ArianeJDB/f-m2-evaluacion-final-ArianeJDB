'use strict';

console.log('>> Ready :)');

const field = document.querySelector('.field');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
// const value = field.value;
const apiBase = 'http://api.tvmaze.com/search/shows?q=';


//función buscar
const search = () => {
  const api = apiBase + field.value;
  fetch(api)
    .then(response => response.json())
    .then(data => {
      
     
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        console.log('ITEM', data[i]);
        const showItem = item.show;
        console.log('data', showItem);
        const showTitle = showItem.name;
        console.log('NAME', showTitle);
        const showImages = showItem.image;
        console.log('IMAGE', showImages);
        const showImage = showImages.medium;
        console.log('MEDIUM', showImage);
        
      }
    });
};

btn.addEventListener('click', search);
