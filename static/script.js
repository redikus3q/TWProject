let body = document.getElementsByClassName("content-container")[0];
let s = window.localStorage;
fetch(window.location.href + "restaurants")
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
    console.log("Fetch Error", err);
  });

function putimg(restaurants) {
  let x = document.getElementsByClassName("imgmain")[0];
  let v = [];
  let k = 0;
  for (let i in restaurants) {
    if (restaurants[i].rating[0] >= 4) {
      v.push(restaurants[i]);
      k = 1;
    }
  }
  if (k == 1) {
    s.setItem("rest", JSON.stringify(v));
    s.setItem("currpointer", 0);
    let restaurant = JSON.parse(s.getItem("rest"))[0];
    x.setAttribute("src", restaurant.img);
    x.setAttribute("alt", restaurant.name + " photo");
    document.getElementById("rest-title").innerText = restaurant.name;
    document.getElementById("rest-address").innerText = restaurant.address;
    document.getElementById("rest-phone").innerText = restaurant.phone;
  }
  else {
    x.setAttribute("src", "https://imgur.com/OaY5R5h.jpg");
    document.getElementById("rest-title").innerText = "Niciun restaurant";
  }
}

function cxc(x) {
  let restaurant = document.getElementsByClassName("imgmain")[0];
  let goodrestaurants = JSON.parse(s.getItem("rest"));
  let len = goodrestaurants.length - 1;
  if (goodrestaurants) {
    let obj = goodrestaurants[0];
    let pointer = parseInt(s.getItem("currpointer"))
    if (x == "-") {
      if (pointer == 0) {
        pointer = len;
      }
      else {
        pointer = pointer - 1;
      }
      obj = goodrestaurants[pointer];
    }
    if (x == "+") {
      if (pointer == len) {
        pointer = 0;
      }
      else {
        pointer = pointer + 1;
      }
      obj = goodrestaurants[pointer];
    }
    s.setItem("currpointer", pointer);
    restaurant.setAttribute("src", obj.img);
    restaurant.setAttribute("animation", "none");
    restaurant.className = "imgmain";
    setTimeout(function () {
      restaurant.className = "imgmain fade";
    }, 10);
    document.getElementById("rest-title").innerText = obj.name;
    document.getElementById("rest-address").innerText = obj.address;
    document.getElementById("rest-phone").innerText = obj.phone;
  }
}

function renderrestaurants(restaurants) {
  document.getElementsByClassName("main")[0].setAttribute("style", "all: unset;");
  document.getElementsByTagName("html")[0].setAttribute("style", "background-color:#ddd; ");
  body.innerHTML = "";
  let creater = document.createElement("button");
  creater.setAttribute("class", "rest-creater");
  creater.setAttribute("onclick", "showdiv();");
  creater.innerText = "Add a restaurant";
  let filter = document.createElement("button");
  filter.setAttribute("class", "rest-creater");
  filter.setAttribute("onclick", "filterpopup();")
  filter.innerText = "Filter";
  let createrdiv = document.createElement("div");
  createrdiv.setAttribute("class", "createrdiv");
  let buttondiv = document.createElement("div");
  buttondiv.setAttribute("class", "buttondiv");
  buttondiv.appendChild(creater);
  buttondiv.appendChild(filter);
  createrdiv.appendChild(buttondiv);
  body.appendChild(createrdiv);

  for (let i in restaurants) {
    div = document.createElement("div");
    img = document.createElement("img");

    edit = document.createElement("button");
    del = document.createElement("button");
    rate = document.createElement("button");

    edit.innerText = "Edit";
    edit.setAttribute("id", restaurants[i]._id);
    edit.setAttribute("onclick", "placeinfo(this.id);");
    edit.setAttribute("class", "but but-edit");

    del.innerText = "Delete";
    del.setAttribute("id", restaurants[i]._id);
    del.setAttribute("onclick", "delrestaurant(this.id);");
    del.setAttribute("class", "but but-del");

    rate.innerText = "Rate";
    rate.setAttribute("id", restaurants[i]._id);
    rate.setAttribute("onclick", "raterestaurant(this.id);");
    rate.setAttribute("class", "but but-del rate" + restaurants[i]._id);

    buttonss = document.createElement("div");
    buttonss.className = "rest-button-container";
    buttonss.appendChild(edit);
    buttonss.appendChild(del);
    buttonss.appendChild(rate);

    img.setAttribute("src", restaurants[i].img);
    img.className = "rest-img";
    h2 = document.createElement("h2");
    h2.innerText = restaurants[i].name;
    h2.className = "rest-name";
    ul = document.createElement("ul");
    ul.className = "rest-desc";
    let li = document.createElement("li");
    for (let j = 0; j < parseInt(restaurants[i].rating[0]); j++) {
      li.innerHTML += `<i class="fa fa-star fa-2x"></i>`
    }
    for (let j = parseInt(restaurants[i].rating[0]); j < 5; j++) {
      li.innerHTML += `<i class="fa fa-star fa-2x" style="color: gray;"></i>`
    }
    li.innerHTML += "<p>" + restaurants[i].rating[0] + "</p>";
    ul.appendChild(li);
    ul.innerHTML += `
      <li>
        <i class="fa fa-map-marker fa-2x"></i>
        <h1 class="rest-address-2">`+ restaurants[i].address + `</h1>
      </li>
      <li>
        <i class="fa fa-phone fa-2x"></i>
        <h1 class="rest-address-2">`+ restaurants[i].phone + `</h1>
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

function restaurante() {
  fetch(window.location.href + "restaurants")
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " +
            response.status);
          return;
        }
        response.json().then(function (data) {
          renderrestaurants(data);
        });
      }
    )
    .catch(function (err) {
      console.log("Fetch Error", err);
    });
}

function showdiv() {
  closepopup();
  document.getElementsByClassName("rest-creater")[0].setAttribute("class", "rest-creater but-active");
  document.getElementsByClassName("rest-creater")[0].setAttribute("onclick", "closediv();")

  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("id", "input1");
  input1.setAttribute("placeholder", "Name");
  input1.setAttribute("maxlength", "30");
  input1.setAttribute("autocomplete", "chrome-off");

  let input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "input2");
  input2.setAttribute("placeholder", "Link");
  input2.setAttribute("autocomplete", "chrome-off");

  let input3 = document.createElement("input");
  input3.setAttribute("type", "text");
  input3.setAttribute("id", "input3");
  input3.setAttribute("placeholder", "Address");
  input3.setAttribute("maxlength", "50");
  input3.setAttribute("autocomplete", "chrome-off");

  let input4 = document.createElement("input");
  input4.setAttribute("type", "text");
  input4.setAttribute("id", "input4");
  input4.setAttribute("placeholder", "Phone");
  input4.setAttribute("maxlength", "20");
  input4.setAttribute("autocomplete", "chrome-off");

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
  button.setAttribute("onclick", "addrestaurant();");
  newdiv.append(button);

  createrdiv.appendChild(newdiv);
}

function closediv() {
  let div = document.getElementsByClassName("top-buttons")[0];
  let createrdiv = document.getElementsByClassName("createrdiv")[0];
  try {
    createrdiv.removeChild(div);
  }
  catch {
    ;
  }

  let button = document.getElementsByClassName("rest-creater")[0]
  button.setAttribute("class", "rest-creater");
  button.setAttribute("onclick", "showdiv();");
}

function filterpopup() {
  closediv();
  document.getElementsByClassName("rest-creater")[1].setAttribute("class", "rest-creater but-active");
  document.getElementsByClassName("rest-creater")[1].setAttribute("onclick", "closepopup();")

  let newdiv = document.createElement("div");
  let createrdiv = document.getElementsByClassName("createrdiv")[0];
  newdiv.className = "top-buttons";

  let ratingdiv = document.createElement("div");
  ratingdiv.className = "ratingdiv";

  let lbl11 = document.createElement("h4");
  lbl11.innerText = "Rating:";
  ratingdiv.appendChild(lbl11);

  let hilo = document.createElement("div");
  hilo.className = "hilo";

  let lbl12 = document.createElement("label");
  lbl12.innerText = "lower";
  lbl12.setAttribute("for", "ratinglower");
  hilo.appendChild(lbl12);

  let checkbox1 = document.createElement("input");
  checkbox1.setAttribute("type", "radio");
  checkbox1.setAttribute("id", "ratinglower");
  checkbox1.setAttribute("name", "ratingradio");
  checkbox1.setAttribute("value", "lo");
  checkbox1.className = "ratingradio";
  hilo.appendChild(checkbox1);

  let lbl13 = document.createElement("label");
  lbl13.innerText = "higher";
  lbl13.setAttribute("for", "ratinghigher");
  hilo.appendChild(lbl13);

  let checkbox2 = document.createElement("input");
  checkbox2.setAttribute("type", "radio");
  checkbox2.setAttribute("id", "ratinghigher");
  checkbox2.setAttribute("name", "ratingradio");
  checkbox2.setAttribute("value", "hi");
  checkbox2.className = "ratingradio";
  hilo.appendChild(checkbox2);

  ratingdiv.appendChild(hilo);

  let lbl14 = document.createElement("label");
  lbl14.innerText = "than";
  lbl14.setAttribute("for", "ratinginput");
  ratingdiv.appendChild(lbl14);

  let ratinginput = document.createElement("input");
  ratinginput.setAttribute("type", "number");
  ratinginput.setAttribute("name", "ratinginput");
  ratinginput.setAttribute("min", "0");
  ratinginput.setAttribute("max", "5");
  ratinginput.setAttribute("value", "0");
  ratinginput.className = "ratinginput";
  ratingdiv.appendChild(ratinginput);

  newdiv.appendChild(ratingdiv);

  let button = document.createElement("button");
  button.setAttribute("class", "but");
  button.innerText = "Filter";
  button.setAttribute("onclick", "filterrestaurant();");
  newdiv.append(button);

  createrdiv.appendChild(newdiv);
}

function closepopup() {
  let div = document.getElementsByClassName("top-buttons")[0];
  let createrdiv = document.getElementsByClassName("createrdiv")[0];
  try {
    createrdiv.removeChild(div);
  }
  catch {
    ;
  }

  let button = document.getElementsByClassName("rest-creater")[1]
  button.setAttribute("class", "rest-creater");
  button.setAttribute("onclick", "filterpopup();");
}

async function addrestaurant() {
  if (document.getElementById("input2").value == "" || document.getElementById("input1").value == "" || document.getElementById("input3").value == "" || document.getElementById("input4").value == "") {
    window.alert("Please complete all fields")
    return;
  }
  let restaurant = {
    img: document.getElementById("input2").value,
    name: document.getElementById("input1").value,
    rating: [0, 0],
    address: document.getElementById("input3").value,
    phone: document.getElementById("input4").value
  };
  let response = await fetch(window.location.href + "restaurants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(restaurant)
  });
  let result = await response.json();
  setTimeout(restaurante(), 400);
}

async function filterrestaurant() {
  let a = document.getElementsByName("ratingradio")[0];
  let b = document.getElementsByName("ratingradio")[1];
  let c = document.getElementsByClassName("ratinginput")[0];
  let filtercheck = 0;
  let linkformat = ""
  if (a.checked && c.value <= 5 && c.value >= 0) {
    linkformat += "r=l" + c.value;
    filtercheck = 1;
  }
  else if (b.checked && c.value <= 5 && c.value >= 0) {
    linkformat += "r=h" + c.value;
    filtercheck = 1;
  }
  if (filtercheck == 0) {
    window.alert("No filter selected");
    return;
  }
  let response = await fetch(window.location.href + "restaurants/filter/" + linkformat, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
  })
  let result = await response.json();

  renderrestaurants(result);

  let content = document.getElementsByClassName("content-container")[0];
  let text = document.getElementsByTagName("h3")[0];
  try {
    content.removeChild(text);
  }
  catch(e) {
    ;
  }

  let button = document.createElement("button");
  let buttondiv = document.getElementsByClassName("buttondiv")[0];
  button.innerText = "Remove filter";
  button.setAttribute("onclick", "restaurante();");
  button.setAttribute("class", "rest-creater");
  buttondiv.appendChild(button);
  if (document.getElementsByClassName("rest-container")[0] == undefined) {
    let content = document.getElementsByClassName("content-container")[0];
    let text = document.createElement("h3");
    text.innerText = "No restaurants found.";
    content.appendChild(text);
  }

}

async function placeinfo(i) {
  let response = await fetch(window.location.href + "restaurants/" + i, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
  });
  let result = await response.json();
  let but = document.getElementsByClassName("rest-creater")[0];
  try {
    let xy = document.getElementsByClassName("top-buttons")[0];
    xy.remove();
  }
  catch {
    ;
  }
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
  button.setAttribute("onclick", "editrestaurant(this.id);");
  newdiv.append(button);
  document.getElementsByClassName("rest-creater")[0].setAttribute("onclick", "restaurante();");
  createrdiv.appendChild(newdiv);
  document.body.scrollTop = 0; //Safari
  document.documentElement.scrollTop = 0; //restul
}

async function editrestaurant(i) {
  if (document.getElementById("input2").value == "" || document.getElementById("input1").value == "" || document.getElementById("input3").value == "" || document.getElementById("input4").value == "") {
    window.alert("Please complete all fields")
    return;
  }
  let restaurant = {
    img: document.getElementById("input2").value,
    name: document.getElementById("input1").value,
    address: document.getElementById("input3").value,
    phone: document.getElementById("input4").value,
  };
  let response = await fetch(window.location.href + "restaurants/" + i, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(restaurant)
  });
  let result = await response.json();
  setTimeout(restaurante(), 400);
}

function raterestaurant(i) {
  let x = document.getElementsByClassName("but but-del rate" + i)[0];
  let buttonss = x.parentElement;
  let p = document.createElement("input");
  p.setAttribute("class", "parareview " + i);
  p.setAttribute("type", "range");
  p.setAttribute("min", 1);
  p.setAttribute("max", 5);
  p.setAttribute("value", 1);
  p.setAttribute("style", "outline: none; border:none;")
  x.remove();
  let y = document.createElement("button");
  y.setAttribute("class", "but but-del " + i);
  y.setAttribute("onclick", "postreview(this.id)");
  y.setAttribute("id", i);
  y.innerText = "Submit";
  buttonss.appendChild(p);
  buttonss.appendChild(y);
}

async function postreview(i) {
  let response = await fetch(window.location.href + "restaurants/" + i, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  let result = await response.json();
  let newre = 0;
  if (parseInt(result.rating[1]) == 0) {
    newre = document.getElementsByClassName("parareview " + i)[0].value;
  }
  else {
    let a = parseFloat(document.getElementsByClassName("parareview " + i)[0].value);
    let b = parseFloat(parseFloat(result.rating[1]) * parseFloat(result.rating[0]));
    let c = parseFloat(parseFloat(result.rating[1]) + 1);
    newre = (parseFloat(a) + parseFloat(b)) / parseFloat(c);
  }
  let restaurant = {
    img: result.img,
    name: result.name,
    address: result.address,
    phone: result.phone,
    rating: [Math.round(newre * 100) / 100, parseInt(result.rating[1]) + 1]
  };
  let response1 = await fetch(window.location.href + "restaurants/" + i, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(restaurant)
  });
  let result1 = await response1.json();
  setTimeout(restaurante(), 400);
}

async function delrestaurant(i) {
  let response = await fetch(window.location.href + "restaurants/" + i, {
    method: "DELETE"
  });

  let result = await response.json();
  setTimeout(restaurante(), 400);
}

function articole() {
  fetch(window.location.href + "articles")
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " +
            response.status);
          return;
        }
        response.json().then(function (data) {
          renderArticles(data);
        });
      }
    )
    .catch(function (err) {
      console.log("Fetch Error", err);
    });

  function renderArticles(restaurants) {
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
    for (let i in restaurants) {
      div = document.createElement("div");

      edit = document.createElement("button");
      del = document.createElement("button");

      edit.innerText = "Edit";
      edit.setAttribute("id", restaurants[i]._id);
      edit.setAttribute("onclick", "placeartinfo(this.id);");
      edit.setAttribute("class", "but but-edit");

      del.innerText = "Delete";
      del.setAttribute("id", restaurants[i]._id);
      del.setAttribute("onclick", "delart(this.id);");
      del.setAttribute("class", "but but-del");

      buttonss = document.createElement("div");
      buttonss.className = "rest-button-container";
      buttonss.appendChild(edit);
      buttonss.appendChild(del)

      p = document.createElement("p");
      p.setAttribute("class", "art-desc");
      p.innerHTML = marked(restaurants[i].description, { breaks: true });

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
  try {
    es = document.getElementsByClassName("top-buttons")[1];
    contents.removeChild(es);
  }
  catch {
    ;
  }
  newdiv = document.createElement("div");
  newdiv.setAttribute("class", "top-buttons buttons-article");
  textb = document.getElementsByTagName("textarea")[0];
  newp = document.createElement("p");
  newp.setAttribute("class", "art-desc preview-desc");
  newp.innerHTML = marked(textb.value, { breaks: true });
  newdiv.append(newp);
  contents.appendChild(newdiv);
}

async function placeartinfo(i) {
  let response = await fetch(window.location.href + "articles/" + i, {
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
  if (document.getElementById("input2").value == "" || document.getElementById("input1").value == "") {
    window.alert("Please complete all fields")
    return;
  }
  let restaurant = {
    name: document.getElementById("input1").value,
    description: document.getElementById("input2").value
  };
  let response = await fetch(window.location.href + "articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(restaurant)
  });
  let result = await response.json();
  setTimeout(articole(), 300);
}

async function editart(i) {
  if (document.getElementById("input2").value == "" || document.getElementById("input1").value == "") {
    window.alert("Please complete all fields")
    return;
  }
  let restaurant = {
    name: document.getElementById("input1").value,
    description: document.getElementById("input2").value
  };
  let response = await fetch(window.location.href + "articles/" + i, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(restaurant)
  });
  let result = await response.json();
  setTimeout(articole(), 300);
}

async function delart(i) {
  let response = await fetch(window.location.href + "articles/" + i, {
    method: "DELETE"
  });

  let result = await response.json();
  setTimeout(articole(), 300);
}
