let body = document.getElementsByClassName("content-container")[0];

fetch('http://localhost:3000/dogs')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function (data) {
          putimg(data);
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

function putimg(dogs){
  x = document.getElementsByClassName("imgmain")[0];
  let k=0;
  for(let i in dogs){
    if(dogs[i].rating>=4){
      x.setAttribute("src", dogs[i].img);
      x.setAttribute("id", "img"+dogs[i].id);
      document.getElementById("rest-title").innerText = dogs[i].name;
      document.getElementById("rest-address").innerText = dogs[i].address;
      document.getElementById("rest-phone").innerText = dogs[i].phone;
      k=1;
      break;
    }
  }
  if(k==0){
    x.setAttribute("src", "https://imgur.com/OaY5R5h.jpg");
    document.getElementById("rest-title").innerText = "Niciun restaurant";
  }
}

function preview(x){
  fetch('http://localhost:3000/dogs')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function (data) {
          solve(data);
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
  function solve(dogs){
    let dog = document.getElementsByClassName("imgmain")[0];
    let y = dog.id[3];
    let goodDogs=[];
    for(let i in dogs){
      if(dogs[i].rating>=4){
        goodDogs.push(dogs[i]);
      }
    }
    if(goodDogs){
      let obj = goodDogs[0];
      let f = 0;
      if(x=='-'){
        for(let i in goodDogs){
          if(goodDogs[i].id < y){
            obj = goodDogs[i];
            f=1;
          }
        }
        if(f==0){
          obj=goodDogs[goodDogs.length-1];
        }
      }
      if(x=='+'){
        for(let i in goodDogs){
          if(goodDogs[i].id > y){
            obj = goodDogs[i];
            f=1;
            break;
          }
        }
        if(f==0){
          obj=goodDogs[0];
        }
      }
      dog.setAttribute("src", obj.img)
      dog.setAttribute("id", "img"+obj.id);
      dog.setAttribute("animation", "none");
      dog.className="imgmain";
      setTimeout(function(){
        dog.className="imgmain fade";},10);
      document.getElementById("rest-title").innerText = obj.name;
      document.getElementById("rest-address").innerText = obj.address;
      document.getElementById("rest-phone").innerText = obj.phone;
    }
  }
}

function restaurante(){
  fetch('http://localhost:3000/dogs')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function (data) {
          console.log(data);
          renderDogs(data);
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

  function renderDogs(dogs) {
    body.innerHTML = "";
    let input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "input1");
    input1.setAttribute("placeholder", "Name");

    let input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "input2");
    input2.setAttribute("placeholder", "Link");

    body.appendChild(input1);
    body.appendChild(input2);

    let newdiv = document.createElement("div");
    newdiv.className="top-buttons";

    let button = document.createElement("button");
    button.setAttribute("id", "but");
    button.innerText = "Add";
    button.setAttribute("onclick", "adddog();");
    newdiv.append(button);

    let button1 = document.createElement("button");
    button1.className="upd";
    button1.setAttribute("disabled", "");
    button1.innerText = "Update";
    button1.setAttribute("onclick", "editdog(this.id);");
    newdiv.append(button1);

    body.appendChild(newdiv);

    for (let i in dogs) {
      div = document.createElement('div');
      img = document.createElement('img');
      edit = document.createElement('button');
      del = document.createElement('button');

      edit.innerText = "edit";
      edit.setAttribute("id", dogs[i].id);
      edit.setAttribute("onclick", "placeinfo(this.id);");

      del.innerText = "delete";
      del.setAttribute("id", dogs[i].id);
      del.setAttribute("onclick", "deldog(this.id);");

      img.setAttribute("src", dogs[i].img);
      img.className="rest-img";
      h2 = document.createElement('h2');
      h2.innerText = dogs[i].name;
      h2.className="rest-name";
      ul = document.createElement('ul');
      ul.className="rest-desc";
      ul.innerHTML=`
        <li>
          <i class="fa fa-star fa-2x"></i>
          <h1 class="rest-address-2">`+dogs[i].rating+`</h1>
        </li>
        <li>
          <i class="fa fa-map-marker fa-2x"></i>
          <h1 class="rest-address-2">`+dogs[i].address+`</h1>
        </li>
        <li>
          <i class="fa fa-phone fa-2x"></i>
          <h1 class="rest-address-2">`+dogs[i].phone+`</h1>
        </li>
      `
      body.setAttribute("style", "background-color:#ddd;");
      buttonss = document.createElement('div');
      buttonss.className="rest-button-container";
      newdiv=document.createElement("div");
      newdiv.setAttribute("class", "rest-img-div");
      newdiv.appendChild(img);
      div.appendChild(newdiv);
      div.appendChild(h2);
      div.appendChild(ul);
      buttonss.appendChild(edit);
      buttonss.appendChild(del)
      div.appendChild(buttonss);
      div.className="rest-container";
      body.appendChild(div);
      input = document.createElement("input");
    }
  }
}
  async function adddog() {
    let dog = {
      img: document.getElementById("input2").value,
      name: document.getElementById("input1").value
    };
    let response = await fetch('http://localhost:3000/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(dog)
    });
    let result = await response.json();
    console.log(result);
    setTimeout(restaurante(), 400);
  }

  async function placeinfo(i){
    a=document.getElementById("input1");
    b=document.getElementById("input2");
    let response = await fetch('http://localhost:3000/dogs/' + i, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });
    let result = await response.json();
    a.value=result.name;
    b.value=result.img;
    c=document.getElementById("but");
    d=document.getElementsByClassName("upd")[0];
    c.setAttribute("disabled", "");
    d.removeAttribute("disabled");
    d.setAttribute("id", i);
  }

  async function editdog(i) {
    console.log(i);
    let dog = {
      img: document.getElementById("input2").value,
      name: document.getElementById("input1").value
    };
    let response = await fetch('http://localhost:3000/dogs/' + i, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(dog)
    });
    let result = await response.json();
    console.log(result);
    c=document.getElementById("but");
    d=document.getElementsByClassName("upd")[0];
    d.setAttribute("disabled", "");
    c.removeAttribute("disabled");
    setTimeout(restaurante(), 400);
  }

  async function deldog(i) {
    let response = await fetch('http://localhost:3000/dogs/' + i, {
      method: 'DELETE'
    });

    let result = await response.json();
    console.log(result);
    setTimeout(restaurante(), 400);
  }