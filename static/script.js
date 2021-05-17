let body = document.getElementsByClassName("content-container")[0];

fetch("http://localhost:3000/dogs")
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " +
          response.status);
        return;
      }
      response.json().then(function (data) {
        putimg(data);
      });
    }
  )
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });

function putimg(dogs) {
  x = document.getElementsByClassName("imgmain")[0];
  let k = 0;
  for (let i in dogs) {
    if (dogs[i].rating >= 4) {
      x.setAttribute("src", dogs[i].img);
      x.setAttribute("id", "img" + dogs[i].id);
      document.getElementById("rest-title").innerText = dogs[i].name;
      document.getElementById("rest-address").innerText = dogs[i].address;
      document.getElementById("rest-phone").innerText = dogs[i].phone;
      k = 1;
      break;
    }
  }
  if (k == 0) {
    x.setAttribute("src", "https://imgur.com/OaY5R5h.jpg");
    document.getElementById("rest-title").innerText = "Niciun restaurant";
  }
}

function cxc(x) {
  fetch("http://localhost:3000/dogs")
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " +
            response.status);
          return;
        }
        response.json().then(function (data) {
          solve(data);
        });
      }
    )
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
  function solve(dogs) {
    let dog = document.getElementsByClassName("imgmain")[0];
    let y = dog.id[3];
    let goodDogs = [];
    for (let i in dogs) {
      if (dogs[i].rating >= 4) {
        goodDogs.push(dogs[i]);
      }
    }
    if (goodDogs) {
      let obj = goodDogs[0];
      let f = 0;
      if (x == "-") {
        for (let i in goodDogs) {
          if (goodDogs[i].id < y) {
            obj = goodDogs[i];
            f = 1;
          }
        }
        if (f == 0) {
          obj = goodDogs[goodDogs.length - 1];
        }
      }
      if (x == "+") {
        for (let i in goodDogs) {
          if (goodDogs[i].id > y) {
            obj = goodDogs[i];
            f = 1;
            break;
          }
        }
        if (f == 0) {
          obj = goodDogs[0];
        }
      }
      dog.setAttribute("src", obj.img);
      dog.setAttribute("id", "img" + obj.id);
      dog.setAttribute("animation", "none");
      dog.className = "imgmain";
      setTimeout(function () {
        dog.className = "imgmain fade";
      }, 10);
      document.getElementById("rest-title").innerText = obj.name;
      document.getElementById("rest-address").innerText = obj.address;
      document.getElementById("rest-phone").innerText = obj.phone;
    }
  }
}

function restaurante() {
  fetch("http://localhost:3000/dogs")
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " +
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
      console.log("Fetch Error :-S", err);
    });

  function renderDogs(dogs) {
    document.getElementsByClassName("main")[0].setAttribute("style", "all: unset;");
    document.getElementsByTagName("html")[0].setAttribute("style", "background-color:#ddd; ");
    body.innerHTML = "";
    let creater = document.createElement("button");
    creater.setAttribute("class", "rest-creater");
    creater.setAttribute("onclick", "showdiv();");
    creater.innerText = "Add a restaurant";
    let createrdiv = document.createElement("div");
    createrdiv.setAttribute("class", "createrdiv");
    createrdiv.appendChild(creater);
    body.appendChild(createrdiv);

    for (let i in dogs) {
      div = document.createElement("div");
      img = document.createElement("img");

      edit = document.createElement("button");
      del = document.createElement("button");

      edit.innerText = "Edit";
      edit.setAttribute("id", dogs[i].id);
      edit.setAttribute("onclick", "restaurante(); setTimeout(placeinfo(this.id), 200);");
      edit.setAttribute("class", "but but-edit");

      del.innerText = "Delete";
      del.setAttribute("id", dogs[i].id);
      del.setAttribute("onclick", "deldog(this.id);");
      del.setAttribute("class", "but but-del");

      buttonss = document.createElement("div");
      buttonss.className = "rest-button-container";
      buttonss.appendChild(edit);
      buttonss.appendChild(del);

      img.setAttribute("src", dogs[i].img);
      img.className = "rest-img";
      h2 = document.createElement("h2");
      h2.innerText = dogs[i].name;
      h2.className = "rest-name";
      ul = document.createElement("ul");
      ul.className = "rest-desc";
      ul.innerHTML = `
        <li>
          <i class="fa fa-star fa-2x"></i>
          <h1 class="rest-address-2">`+ dogs[i].rating + `</h1>
        </li>
        <li>
          <i class="fa fa-map-marker fa-2x"></i>
          <h1 class="rest-address-2">`+ dogs[i].address + `</h1>
        </li>
        <li>
          <i class="fa fa-phone fa-2x"></i>
          <h1 class="rest-address-2">`+ dogs[i].phone + `</h1>
        </li>
      `;
      body.setAttribute("style", "background-color:#ddd;");
      newdiv = document.createElement("div");
      newdiv.setAttribute("class", "rest-img-div");
      newdiv.appendChild(img);
      div.appendChild(newdiv);
      div.appendChild(h2);
      div.appendChild(ul);
      div.appendChild(buttonss);
      div.className = "rest-container";
      body.appendChild(div);
    }
  }
}

function showdiv() {
  document.getElementsByClassName("rest-creater")[0].setAttribute("class", "rest-creater but-active");

  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("id", "input1");
  input1.setAttribute("placeholder", "Name");
  input1.setAttribute("maxlength", "30");

  let input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "input2");
  input2.setAttribute("placeholder", "Link");

  let input3 = document.createElement("input");
  input3.setAttribute("type", "text");
  input3.setAttribute("id", "input3");
  input3.setAttribute("placeholder", "Address");
  input3.setAttribute("maxlength", "50");

  let input4 = document.createElement("input");
  input4.setAttribute("type", "text");
  input4.setAttribute("id", "input4");
  input4.setAttribute("placeholder", "Phone");
  input4.setAttribute("maxlength", "20");

  let newdiv = document.createElement("div");
  newdiv.className = "top-buttons";

  let createrdiv = document.getElementsByClassName("createrdiv")[0];
  newdiv.appendChild(input1);
  newdiv.appendChild(input2);
  newdiv.appendChild(input3);
  newdiv.appendChild(input4);


  let button = document.createElement("button");
  button.setAttribute("class", "but");
  button.innerText = "Add";
  button.setAttribute("onclick", "adddog();");
  newdiv.append(button);
  document.getElementsByClassName("rest-creater")[0].setAttribute("onclick", "restaurante();")
  createrdiv.appendChild(newdiv);
}

async function adddog() {
  let dog = {
    img: document.getElementById("input2").value,
    name: document.getElementById("input1").value,
    rating: 0,
    address: document.getElementById("input3").value,
    phone: document.getElementById("input4").value
  };
  let response = await fetch("http://localhost:3000/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(dog)
  });
  let result = await response.json();
  console.log(result);
  setTimeout(restaurante(), 400);
}

async function placeinfo(i) {
  let response = await fetch("http://localhost:3000/dogs/" + i, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
  });
  let result = await response.json();
  let but = document.getElementsByClassName("rest-creater")[0];
  but.setAttribute("class", "rest-creater but-active");
  but.innerText = "Editing mode";
  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("id", "input1");
  input1.setAttribute("value", result.name);
  input1.setAttribute("maxlength", "30");

  let input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "input2");
  input2.setAttribute("value", result.img);

  let input3 = document.createElement("input");
  input3.setAttribute("type", "text");
  input3.setAttribute("id", "input3");
  input3.setAttribute("value", result.address);
  input3.setAttribute("maxlength", "50");

  let input4 = document.createElement("input");
  input4.setAttribute("type", "text");
  input4.setAttribute("id", "input4");
  input4.setAttribute("value", result.phone);
  input4.setAttribute("maxlength", "20");

  let newdiv = document.createElement("div");
  newdiv.className = "top-buttons";

  let createrdiv = document.getElementsByClassName("createrdiv")[0];
  newdiv.appendChild(input1);
  newdiv.appendChild(input2);
  newdiv.appendChild(input3);
  newdiv.appendChild(input4);


  let button = document.createElement("button");
  button.setAttribute("class", "but");
  button.innerText = "Edit";
  button.setAttribute("id", i);
  button.setAttribute("onclick", "editdog(this.id);");
  newdiv.append(button);
  document.getElementsByClassName("rest-creater")[0].setAttribute("onclick", "restaurante();");
  createrdiv.appendChild(newdiv);
  document.body.scrollTop = 0; //Safari
  document.documentElement.scrollTop = 0; //restul
}

async function editdog(i) {
  console.log(i);
  let dog = {
    img: document.getElementById("input2").value,
    name: document.getElementById("input1").value,
    address: document.getElementById("input3").value,
    phone: document.getElementById("input4").value,
  };
  let response = await fetch("http://localhost:3000/dogs/" + i, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(dog)
  });
  let result = await response.json();
  console.log(result);
  setTimeout(restaurante(), 400);
}

async function deldog(i) {
  let response = await fetch("http://localhost:3000/dogs/" + i, {
    method: "DELETE"
  });

  let result = await response.json();
  console.log(result);
  setTimeout(restaurante(), 400);
}
function articole() {
  fetch("http://localhost:3000/articles")
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " +
            response.status);
          return;
        }
        response.json().then(function (data) {
          console.log(data);
          renderArticles(data);
        });
      }
    )
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });

  function renderArticles(dogs) {
    document.getElementsByClassName("main")[0].setAttribute("style", "all: unset;");
    document.getElementsByTagName("body")[0].setAttribute("style", "background-color:#ddd;");
    document.getElementsByTagName("html")[0].setAttribute("style", "font-family: Arial, Helvetica, sans-serif;");
    body.innerHTML = "";
    let creater = document.createElement("button");
    creater.setAttribute("class", "rest-creater");
    creater.setAttribute("onclick", "showartdiv();");
    creater.innerText = "Add an article";
    let createrdiv = document.createElement("div");
    createrdiv.setAttribute("class", "createrdiv")
    createrdiv.appendChild(creater);
    body.appendChild(createrdiv);
    let ccdiv = document.createElement("div");
    ccdiv.className = "article-cc";
    for (let i in dogs) {
      div = document.createElement("div");

      edit = document.createElement("button");
      del = document.createElement("button");

      edit.innerText = "Edit";
      edit.setAttribute("id", dogs[i].id);
      edit.setAttribute("onclick", "articole(); setTimeout(placeartinfo(this.id), 200);");
      edit.setAttribute("class", "but but-edit");

      del.innerText = "Delete";
      del.setAttribute("id", dogs[i].id);
      del.setAttribute("onclick", "delart(this.id);");
      del.setAttribute("class", "but but-del");

      buttonss = document.createElement("div");
      buttonss.className = "rest-button-container";
      buttonss.appendChild(edit);
      buttonss.appendChild(del)

      p = document.createElement("p");
      p.setAttribute("class", "art-desc");
      p.innerHTML = marked(dogs[i].description, { breaks: true });

      div.appendChild(p);
      div.appendChild(buttonss);
      div.className = "rest-container article";
      ccdiv.appendChild(div);
    }
    body.appendChild(ccdiv);
    body.setAttribute("style", "background-color:#ddd;");
  }
}

function showartdiv() {
  document.getElementsByClassName("article-cc")[0].innerHTML = "";
  document.getElementsByClassName("rest-creater")[0].setAttribute("class", "rest-creater but-active");

  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("id", "input1");
  input1.setAttribute("placeholder", "Title");
  input1.setAttribute("maxlength", "30");

  let input2 = document.createElement("textarea");
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "input2");
  input2.setAttribute("placeholder", "Text");

  let newdiv = document.createElement("div");
  newdiv.setAttribute("class", "top-buttons buttons-article");

  let createrdiv = document.getElementsByClassName("createrdiv")[0];
  newdiv.appendChild(input1);
  newdiv.appendChild(input2);

  let buttondiv = document.createElement("div");
  buttondiv.setAttribute("class", "newart-buttons");
  let button = document.createElement("button");
  button.setAttribute("class", "but");
  button.innerText = "Add";
  button.setAttribute("onclick", "addart();");
  buttondiv.append(button);
  let button1 = document.createElement("button");
  button1.setAttribute("class", "but");
  button1.innerText = "Preview";
  button1.setAttribute("onclick", "preview();");
  buttondiv.append(button1);
  newdiv.appendChild(buttondiv);
  document.getElementsByClassName("rest-creater")[0].setAttribute("onclick", "articole();")
  createrdiv.appendChild(newdiv);
}

function preview() {
  contents = document.getElementsByClassName("content-container")[0];
  try{
    es = document.getElementsByClassName("top-buttons")[1];
    contents.removeChild(es);
  }
  catch{
    ;
  }
  newdiv = document.createElement("div");
  newdiv.setAttribute("class", "top-buttons buttons-article");
  textb = document.getElementsByTagName("textarea")[0];
  newp = document.createElement("p");
  newp.setAttribute("class", "art-desc");
  newp.innerHTML = marked(textb.value, { breaks: true });
  newdiv.append(newp);
  contents.appendChild(newdiv);
}

async function placeartinfo(i) {
  let response = await fetch("http://localhost:3000/articles/" + i, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
  });
  let result = await response.json();
  document.getElementsByClassName("article-cc")[0].innerHTML = "";
  let dd = document.getElementsByClassName("rest-creater")[0]
  dd.setAttribute("class", "rest-creater but-active");
  dd.innerText = "Editing mode";

  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("id", "input1");
  input1.setAttribute("value", result.name);
  input1.setAttribute("maxlength", "30");

  let input2 = document.createElement("textarea");
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "input2");
  input2.innerHTML = result.description;
  input2.setAttribute("placeholder", "Text");

  let newdiv = document.createElement("div");
  newdiv.setAttribute("class", "top-buttons buttons-article");

  let createrdiv = document.getElementsByClassName("createrdiv")[0];
  newdiv.appendChild(input1);
  newdiv.appendChild(input2);

  let buttondiv = document.createElement("div");
  buttondiv.setAttribute("class", "newart-buttons");
  let button = document.createElement("button");
  button.setAttribute("class", "but");
  button.innerText = "Edit";
  button.setAttribute("id", i);
  button.setAttribute("onclick", "editart(this.id);");
  buttondiv.append(button);
  let button1 = document.createElement("button");
  button1.setAttribute("class", "but");
  button1.innerText = "Preview";
  button1.setAttribute("onclick", "preview();");
  buttondiv.append(button1);
  newdiv.appendChild(buttondiv);
  document.getElementsByClassName("rest-creater")[0].setAttribute("onclick", "articole();")
  createrdiv.appendChild(newdiv);
}

async function addart() {
  let dog = {
    name: document.getElementById("input1").value,
    description: document.getElementById("input2").value
  };
  let response = await fetch("http://localhost:3000/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(dog)
  });
  let result = await response.json();
  console.log(result);
  setTimeout(articole(), 300);
}

async function editart(i) {
  console.log(i);
  let dog = {
    name: document.getElementById("input1").value,
    description: document.getElementById("input2").value
  };
  let response = await fetch("http://localhost:3000/articles/" + i, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(dog)
  });
  let result = await response.json();
  console.log(result);
  setTimeout(articole(), 300);
}

async function delart(i) {
  let response = await fetch("http://localhost:3000/articles/" + i, {
    method: "DELETE"
  });

  let result = await response.json();
  console.log(result);
  setTimeout(articole(), 300);
}
