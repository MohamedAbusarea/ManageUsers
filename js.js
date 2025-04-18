let data =[

    {
    name:'mohamed.abusarea',
    branch:'safwazaid',
    code:'3118',
    
    systems:['AX','OMS','RMS']
    },
    {
        name:'ali.eslam',
        branch:'manial',
        code:'31173',
        systems:['AX','OMS','CRM']
    },
    {

        name:'ahmed.ms',
        branch:'manial',
        code:'3118',
        systems:['AX','OMS','CRM']

    },


    {

        name:'zaher.ms',
        branch:'manial',
        code:'31198',
        systems:['AX','OMS','CRM']

    }

]

// console.log(data)
// let index = data.findIndex(f => f.code.trim() === );
// console.log(index); 

// data.forEach(a =>{




//     console.log(a.code)
//     const position = keys.indexOf("3118");
//     console.log(position); // Output: 1 (because it's the second key)

// })

console.log()


//seacrch



const click_search = document.getElementById('btn_search');


click_search.addEventListener('click', ()=>{

    // console.log('hello')
    const v_search = document.getElementById('search').value;
    document.querySelector('.a1').textContent = typeof(v_search);

    if (!isNaN(v_search) && v_search.trim() !== "") {


        
      } else {
        
      }

})

 




