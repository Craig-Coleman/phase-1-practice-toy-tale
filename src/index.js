let addToy = false;

//Fetches toys from Server
document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => createCard(toy)))
})

//renders toy cards to dom
function createCard (toy) {
  let div = document.createElement('div');
  div.setAttribute('class', 'card');
  let h2 = document.createElement('h2');
  h2.innerText = toy.name
  let img = document.createElement('img');
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');
  let p = document.createElement('p');
  p.innerText = toy.likes + ' likes';
  let btn = document.createElement('BUTTON');
  btn.setAttribute('class', 'like-btn');
  btn.setAttribute('id', toy.id);
  btn.innerText = 'like';
  btn.addEventListener('click', function() {
    toy.likes+= 1
    div.querySelector('p').innerText = toy.likes + ' likes'
    updateToy(toy)
  })
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(btn);
  document.querySelector('#toy-collection').appendChild(div);
}

//Hides and reveals button on click
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Posts new toy from form to Server
document.querySelector('.add-toy-form').addEventListener('submit', function (e) {
  e.preventDefault();
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify(toyObj)
    }).then(res => res.json())
    .then(newToy => createCard(newToy))
})

function updateToy(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers:
    {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  }).then(res => res.json())
}