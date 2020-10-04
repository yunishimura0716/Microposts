// const getData = async (url) => {
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);
// };

// getData('https://jsonplaceholder.typicode.com/posts');

// common js module syntax
// const person = require('./mymodule');

// ES2015 module
// import { person, sayHello } from './mymodule2';
// import * as mod from './mymodule2';
// import greeting from './mymodule2';

// console.log(mod.person.name);
// console.log(mod.sayHello());
// console.log(greeting);

import { http } from './http';
import { ui } from './ui';

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
// listen fro add post
document.querySelector('.post-submit').addEventListener('click', addPost);

// get post
function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}
// add post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
} 