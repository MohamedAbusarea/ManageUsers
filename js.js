//customer data
let data = [
  {
    name: "mohamed.abusarea",
    branch: "safwazaid",
    code: "31189",

    systems: ["AX", "OMS", "RMS"],
  },
  {
    name: "ali.eslam",
    branch: "manial",
    code: "31173",
    systems: ["AX", "OMS", "CRM"],
  },
  {
    name: "ahmed.ms",
    branch: "manial",
    code: "3118",
    systems: ["AX", "OMS", "CRM"],
  },

  {
    name: "zaher.ms",
    branch: "manial",
    code: "31198",
    systems: ["AX", "OMS", "CRM"],
  },
];

systems = [
  "AX",
  "OMS",
  "CRM",
  "CRM Mylo",
  "Magento",
  "Magento dell",
  "MYLO",
  "Reports",
  "Power BI",
];

//add information data -3
function add_information(index) {
  console.log(index);
  if (index === -1) {
    err_user();
    return;
  } else {
    const information = (document.querySelector(".info_list").innerHTML =
      `<li class='list-group-item'><span>Name : ${data[index].name}</span></li>` +
      `<li class='list-group-item'><span>Code: </span>${data[index].code}</li>` +
      `<li class='list-group-item'><span>Branch: </span>${data[index].branch}</li>`);
  }
}

//add information systems

function show_systems(index) {
  document.querySelector(".group_systems").innerHTML = "";

  data[index].systems.forEach((i) => {
    const systems = (document.querySelector(".group_systems").innerHTML +=
      ` <li class="list-group-item">
                <div
                  class="form-check form-switch d-flex justify-content-between align-items-center"
                >
                  <label class="form-check-label" for="sys_${i}">${i}</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="sys_${i}"
                  />
                </div>
              </li>

        `);
  });

  data[index].systems.forEach((i) => {
    document.getElementById(`sys_${i}`).checked = true;
    console.log(i);
  });
}

//  check number and string and find index -2
function info_data(v_search, type) {
  let index;
  if (type === "num") {
    index = data.findIndex((f) => f.code.trim() === v_search);
    add_information(index);
    show_systems(index);
  } else if (type === "str") {
    index = data.findIndex((f) => f.name.trim() === v_search);
    add_information(index);
    show_systems(index);
  } else {
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
  } else {
  }
});

//notifcation // alert user not found
function err_user() {
  document.querySelector(".alert_info").innerHTML =
    `<div class="alert alert-primary" role="alert">
  The user or code not exsit
</div>`;
  document.querySelector(".alert_info").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert_info").style.display = "none";
  }, 3000);
}

//show edit

function show_edit() {
  document.getElementById("btn_search").addEventListener("click", () => {
    document.querySelector(".add_data").innerHTML = `
      <div class="card-footer">
          <div class="input-group">
            <select class="form-select" id="system-select">
              <option value="" disabled selected>Select a system</option>
              <option value="POS">POS</option>
              <option value="WMS">WMS</option>
              <option value="ERP">ERP</option>
              <option value="CRM">CRM</option>
            </select>
            <button class="btn btn-primary" type="button" onclick="addSystem()">
              Add
            </button>
          </div>
        </div>
        <br />
        <button class="btn btn-primary w-100" id="btn-save">Save</button>
      
        `;

    let n = document.querySelector(".form-check-input");

    if (n) {
      document.querySelector(".add_data").style.display = "block";
    }
  });
}

show_edit();
