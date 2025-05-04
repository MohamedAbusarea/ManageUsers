import { data, systems } from "./data_test.js";
import{ index } from "./main.js";
//show information systems

export function show_systems(index) {
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