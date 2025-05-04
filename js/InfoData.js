import { index  } from "./main.js";
import { data ,systems } from "./data_test.js";
import {err_user} from "./main.js"
//show information data -3
export function add_information(index) {
  

  if (index === -1) {
    err_user();
    return;
  } else {
    const information = (document.querySelector(".info_list").innerHTML =
      `<li class='list-group-item'><span>Name : ${data[index].name}</span></li>` +
      `<li class='list-group-item'><span>Code: </span>${data[index].code}</li>` +
      `<li class='list-group-item'><span>Branch: </span>${data[index].branch}
     <i type ='button'  class="bi bi-gear edit_branch" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
      
      
      
      `);
  }
}

//show edit
export function show_edit(index) {
    let sys;
    let n1 = data[index].systems;
    sys = systems.filter((item) => !data[index].systems.includes(item));
    sys.forEach((s) => {
      document.querySelector("#system-select").innerHTML += `
          <option value="${s}">${s}</option>
    `;
    });
    document.querySelector(".add_data").style.display = "block";
    document.querySelector("#btn-save").style.display = "block";
  }
  