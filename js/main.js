export let index;

import './systemsData.js';
import './data_test.js';
import './systems/OMS.js'
import './InfoData.js';


import { data, systems } from "./data_test.js";
import { show_systems } from "./systemsData.js";
import {show_edit,add_information} from "./InfoData.js";
//compnant
function loadComponent(targetId, filePath) {
  fetch(filePath)
    .then(res => res.text())
    .then(html => {
      document.getElementById(targetId).innerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('OMS', './components/OMS.html');
  loadComponent('ChangeBranch','./components/ChangeBranch.html')
});





//  check number and string and find index -2
function info_data(v_search, type) {
  if (type === "num") {
    index = data.findIndex((f) => f.code.trim() === v_search);
    add_information(index);
    show_edit(index);
    show_systems(index);
  } else if (type === "str") {
    index = data.findIndex((f) => f.name.trim() === v_search);
    add_information(index);
    show_edit(index);
    show_systems(index);
  }
}

//search --1
const click_search = document.getElementById("btn_search");
click_search.addEventListener("click", () => {
  const v_search = document.getElementById("search").value;
  if (!isNaN(v_search) && v_search.trim() !== "") {
    info_data(v_search, "num");
  } else if (isNaN(v_search) && v_search.trim() !== "") {
    info_data(v_search, "str");
  }
});

//notifcation // alert user not found
export function err_user() {
  document.querySelector(".alert_info").innerHTML =
    `<div class="alert alert-primary" role="alert">
  The user or code not exsit
</div>`;
  document.querySelector(".alert_info").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert_info").style.display = "none";
  }, 3000);
}


// show forms systems

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById("system-select").addEventListener("change", () => {
  
    const n = document.getElementById("system-select").value;
    document.getElementById("btn-save").setAttribute("data-bs-target", `#${n}`);
    console.log(n);
  });
  


});




