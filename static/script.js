let body = document.getElementsByClassName("content-container")[0];
let s = window.localStorage;

fetch(window.location.href+"dogs")
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
  let x = document.getElementsByClassName("imgmain")[0];
  let v = [];
  let k = 0;
  for (let i in dogs) {
    if (dogs[i].rating[0] >= 4) {
      v.push(dogs[i]);
      k = 1;
    }
  }
  if (k == 1) {
    s.setItem("rest", JSON.stringify(v));
    let dog = JSON.parse(s.getItem("rest"))[0];
    x.setAttribute("src", dog.img);
    x.setAttribute("id", "img" + dog.id);
    document.getElementById("rest-title").innerText = dog.name;
    document.getElementById("rest-address").innerText = dog.address;
    document.getElementById("rest-phone").innerText = dog.phone;
  }
  else {
    x.setAttribute("src", "https://imgur.com/OaY5R5h.jpg");
    document.getElementById("rest-title").innerText = "Niciun restaurant";
  }
}

function cxc(x) {
  let dog = document.getElementsByClassName("imgmain")[0];
  let y = dog.id[3];
  let goodDogs = JSON.parse(s.getItem("rest"));
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

function restaurante() {
  fetch(window.location.href+"dogs")
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
      rate = document.createElement("button");

      edit.innerText = "Edit";
      edit.setAttribute("id", dogs[i].id);
      edit.setAttribute("onclick", "placeinfo(this.id);");
      edit.setAttribute("class", "but but-edit");

      del.innerText = "Delete";
      del.setAttribute("id", dogs[i].id);
      del.setAttribute("onclick", "deldog(this.id);");
      del.setAttribute("class", "but but-del");

      rate.innerText = "Rate";
      rate.setAttribute("id", dogs[i].id);
      rate.setAttribute("onclick", "ratedog(this.id);");
      rate.setAttribute("class", "but but-del rate" + dogs[i].id);

      buttonss = document.createElement("div");
      buttonss.className = "rest-button-container";
      buttonss.appendChild(edit);
      buttonss.appendChild(del);
      buttonss.appendChild(rate);

      img.setAttribute("src", dogs[i].img);
      img.className = "rest-img";
      h2 = document.createElement("h2");
      h2.innerText = dogs[i].name;
      h2.className = "rest-name";
      ul = document.createElement("ul");
      ul.className = "rest-desc";
      let li = document.createElement("li");
      for (let j = 0; j < parseInt(dogs[i].rating[0]); j++) {
        li.innerHTML += `<i class="fa fa-star fa-2x"></i>`
      }
      for (let j = parseInt(dogs[i].rating[0]); j < 5; j++) {
        li.innerHTML += `<i class="fa fa-star fa-2x" style="color: gray;"></i>`
      }
      li.innerHTML += "<p>" + dogs[i].rating[0] + "</p>";
      ul.appendChild(li);
      ul.innerHTML += `
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
  button.setAttribute("onclick", "adddog();");
  newdiv.append(button);
  document.getElementsByClassName("rest-creater")[0].setAttribute("onclick", "restaurante();")
  createrdiv.appendChild(newdiv);
}

async function adddog() {
  if (document.getElementById("input2").value == "" || document.getElementById("input1").value == "" || document.getElementById("input3").value == "" || document.getElementById("input4").value == "") {
    window.alert("Please complete all fields")
    return;
  }
  let dog = {
    img: document.getElementById("input2").value,
    name: document.getElementById("input1").value,
    rating: [0, 0],
    address: document.getElementById("input3").value,
    phone: document.getElementById("input4").value
  };
  let response = await fetch(window.location.href+"dogs", {
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
  let response = await fetch(window.location.href+"dogs/" + i, {
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
  button.setAttribute("onclick", "editdog(this.id);");
  newdiv.append(button);
  document.getElementsByClassName("rest-creater")[0].setAttribute("onclick", "restaurante();");
  createrdiv.appendChild(newdiv);
  document.body.scrollTop = 0; //Safari
  document.documentElement.scrollTop = 0; //restul
}

async function editdog(i) {
  if (document.getElementById("input2").value == "" || document.getElementById("input1").value == "" || document.getElementById("input3").value == "" || document.getElementById("input4").value == "") {
    window.alert("Please complete all fields")
    return;
  }
  let dog = {
    img: document.getElementById("input2").value,
    name: document.getElementById("input1").value,
    address: document.getElementById("input3").value,
    phone: document.getElementById("input4").value,
  };
  let response = await fetch(window.location.href+"dogs" + i, {
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

function ratedog(i) {
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
  console.log(i);
  let response = await fetch(window.location.href+"dogs/" + i, {
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
  let dog = {
    img: result.img,
    name: result.name,
    address: result.address,
    phone: result.phone,
    rating: [Math.round(newre * 100) / 100, parseInt(result.rating[1]) + 1]
  };
  console.log(i);
  let response1 = await fetch(window.location.href+"dogs/" + i, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(dog)
  });
  let result1 = await response1.json();
  console.log(result1);
  setTimeout(restaurante(), 400);
}

async function deldog(i) {
  let response = await fetch(window.location.href+"dogs/" + i, {
    method: "DELETE"
  });

  let result = await response.json();
  console.log(result);
  setTimeout(restaurante(), 400);
}

function articole() {
  fetch(window.location.href+"articles")
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
      edit.setAttribute("onclick", "placeartinfo(this.id);");
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
  let response = await fetch(window.location.href+"articles/" + i, {
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
  let dog = {
    name: document.getElementById("input1").value,
    description: document.getElementById("input2").value
  };
  let response = await fetch(window.location.href+"articles", {
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
  if (document.getElementById("input2").value == "" || document.getElementById("input1").value == "") {
    window.alert("Please complete all fields")
    return;
  }
  let dog = {
    name: document.getElementById("input1").value,
    description: document.getElementById("input2").value
  };
  let response = await fetch(window.location.href+"articles/" + i, {
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
  let response = await fetch(window.location.href+"articles/" + i, {
    method: "DELETE"
  });

  let result = await response.json();
  console.log(result);
  setTimeout(articole(), 300);
}
