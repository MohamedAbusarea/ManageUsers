window.save_oms = save_oms;
import { index } from "../main.js";
import { data } from "../data_test.js";
import { show_systems } from "../systemsData.js";


//save form OMS
function save_oms() {
    console.log('asdasf')

      console.log(index)
      const form = document.getElementById("omsForm");
    
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
      } else {
        
        const modal = bootstrap.Modal.getInstance(document.getElementById("OMS"));
        modal.hide();
        form.reset();
    
       
        const val_select = document.getElementById('system-select').value;
        console.log('heloo',val_select)
        data[index].systems.push(val_select)
        show_systems(index)
        console.log(val_select)
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'successful',
    
        })
      }
    }

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

// solve issue bloked

function solve_issue_blocked(){
    document.activeElement.blur(); // Prevent accessibility issue
    const modal = document.getElementById("OMS");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  
  }
