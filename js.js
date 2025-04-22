//customer data
let index;
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
    systems: ["AX", "CRM Mylo", "CRM"],
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

//show information data -3
function add_information(index) {
  

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

//show information systems

function show_systems(index) {
  document.querySelector(".group_systems").innerHTML = "";

  data[index].systems.forEach((i) => {
    const systems = (document.querySelector(".group_systems").innerHTML +=
      ` <li class="list-group-item">
                <div
                  class="form-check form-switch d-flex justify-content-between align-items-center"
                >
                  <label class="form-check-label" for="${i}">${i}</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="${i}"
                  />
                </div>
              </li>

        `);

        diabled_systems()
  });

  data[index].systems.forEach((i) => {
    document.getElementById(`${i}`).checked = true;
  });
}

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
function show_edit(index) {
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

// show form

document.getElementById("system-select").addEventListener("change", () => {
  n = document.getElementById("system-select").value;
  console.log(n);
  if (n === "OMS") {
    document.getElementById("btn-save").setAttribute("data-bs-target", `#${n}`);
  }
});

// solve issue bloked

function solve_issue_blocked(){
  document.activeElement.blur(); // Prevent accessibility issue
  const modal = document.getElementById("OMS");
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();

}




//save form OMS

document.getElementById("save_OMS").addEventListener("click", () => {

  console.log(index)
  const form = document.getElementById("omsForm");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
  } else {
    
    const modal = bootstrap.Modal.getInstance(document.getElementById("OMS"));
    modal.hide();
    form.reset();

   
    const val_select = document.getElementById('system-select').value;
    data[index].systems.push(val_select)
    show_systems(index)
    console.log(val_select)
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'successful',

    })
  }
});



//reset from and remove validated when click colse
let cl = document.querySelectorAll('.close_form_OMS');
const form = document.getElementById("omsForm");
cl.forEach((n)=>{

  n.addEventListener('click',()=>{
    form.reset();
    form.classList.remove('was-validated')
// error
solve_issue_blocked()

    
  })
  
})


// disabled systems


function diabled_systems(){

 let check_checked = document.querySelectorAll('.form-check-input');
 
 check_checked.forEach((n)=>{


  n.addEventListener('change',()=>{

    Swal.fire({
      title: "Are you sure?",
      text: "disable this system!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, disable it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the system from the data array
        let sys = data[index].systems;
        data[index].systems =  sys.filter(item => item !== n.id);
        show_systems(index)


        Swal.fire({
          title: "disable!",
          text: "Your file has been disabled.",
          icon: "success"
        });
      }else if (result.isDismissed) {
        n.checked = true; // Revert the checkbox state
      }
    });
   

  })


 })
}




 


  





