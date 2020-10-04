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
document.querySelector('.post-submit').addEventListener('click', submitPost);
// listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);
// listen for edit
document.querySelector('#posts').addEventListener('click', enableEdit);
// listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
    const id = document.querySelector('#id').value;

    // validate input
    if (title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    } else {
        const data = {
            title,
            body
        }
        // check id
        if (id === '') {
            // create post
            http.post('http://localhost:3000/posts', data)
                .then( data => {
                    ui.showAlert('Post added', 'alert alert-success');
                    ui.clearField();
                    getPosts();
                })
                .catch(err => console.log(err));
        } else {
            // update post
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then( data => {
                    ui.showAlert('Post added', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }

}
// delete post
function deletePost(e) {
    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if (confirm('Are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post removed', 'alert alert-success');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
    e.preventDefault();
}
// edit post
function enableEdit(e) {
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        // fill form with current post
        ui.fillForm(data);
    }
    e.preventDefault();
}
// cancel edit state
function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }

    e.preventDefault();
}