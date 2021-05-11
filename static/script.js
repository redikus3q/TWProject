let body = document.getElementsByClassName("content-container")[0];
body.innerText = "Loading...";

function restaurante(){
  fetch('http://localhost:3000/dogs')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
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
    body.innerText = "";
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
      p = document.createElement('p');
      p.innerText = dogs[i].name;
      p.className="rest-name";

      buttonss = document.createElement('div');
      buttonss.className="rest-button-container";
      div.appendChild(p);
      div.appendChild(img);
      buttonss.appendChild(edit);
      buttonss.appendChild(del)
      div.appendChild(buttonss);
      p.setAttribute("style", "font-size:40px;");
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