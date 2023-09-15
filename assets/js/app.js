let titel = document.querySelector('.title input');
let allcost = document.querySelectorAll('.total_cost input');
let count = document.querySelector('.count input');
let department = document.querySelector ('.department input');
let btn_create = document.querySelector('.inputs_data button');
let tbody = document.querySelector('tbody');
let clear =document.querySelector('.list_product button')
let countclear = document.querySelector('.list_product span');
let validation_span = document.querySelectorAll('.inputs_data span');
let tr = document.querySelectorAll('tr');
let mood = 'create';

let globalID 
let products;


  if(localStorage.products != null){
    products = JSON.parse(localStorage.products);
  }else{
    products = []; 
  }
  

let getTotal = () => {
  price = allcost[0].value;
  tax = allcost[1].value;
  discount = allcost[2].value;
  let taxCost = +price * (+tax / 100 );
  total = (+taxCost + +price) - +discount
  allcost[3].value = Math.ceil(total);
}

for(i = 0 ; i < allcost.length ; i++){
  allcost[i].addEventListener('keyup',getTotal);
}



let creatObject = () => {
  let newProductObject = {
      titel : titel.value,
      price : allcost[0].value,
      tax : allcost[1].value,
      discount : allcost[2].value,
      total : allcost[3].value,
      count : count.value,
      department : department.value
  }
  if(mood == 'create'){

    if(count.value == 0 ){
      validation_span[4].style.display = "block";
    }else if(titel.value == ""){
      validation_span[0].style.display = "block";

    }else if(allcost[0].value == "" || allcost[0].value <= 0){

      validation_span[1].style.display = "block";

    }else if(allcost[1].value == "" || allcost[1].value < 0){

      validation_span[1].style.display = "block";

    }else if(allcost[2].value == "" || allcost[2].value < 0){

      validation_span[2].style.display = "block";

    }else if(allcost[3].value == "" || allcost[3].value < 0){

      validation_span[3].style.display = "block";

    }else if(department.value == "" || department.value < 0){

      validation_span[5].style.display = "block";

    } else{
      for(i = 1 ; i <= count.value ;i++ ){

        products.push(newProductObject);

      }
      
      validation_span[4].style.display = "none"; 
      validation_span[0].style.display = "none"; 
      validation_span[1].style.display = "none"; 
      validation_span[2].style.display = "none"; 
      validation_span[3].style.display = "none"; 
      validation_span[5].style.display = "none";  
    }

  }else{

    products[globalID] = newProductObject;
    mood = 'create';
    btn_create.innerHTML = "Add this Product";
    count.classList.remove('none');
  }
  
  
    renderData();
    clearTnputs() ;
    localStorage.setItem("products",JSON.stringify(products));
   
   

}

let clearTnputs = () =>{
  titel.value = ""
  allcost[0].value = ""
  allcost[1].value = ""
  allcost[2].value = ""
  allcost[3].value = ""
  count.value = ""
  department.value = ""
}

let renderData = () =>{
  let table = "";
  for(let i = 0 ; i < products.length ; i++){
    table += `
    
    <tr>
      <td>${i+1}</td>
      <td>${products[i].titel}</td>
      <td>${products[i].price}</td>
      <td>${products[i].tax}</td>
      <td>${products[i].discount}</td>
      <td>${products[i].total}</td>
      <td>${products[i].department}</td>
      <td> 
      <a onclick = "delete_item(${i})">
        <i class="fa-solid fa-trash-can"></i>
      </a>

      <a onclick = "update(${i})"> 
        <i class="fa-regular fa-pen-to-square"></i> 
      </a>
        </td>
    </tr>`
  }
   tbody.innerHTML += table;  
   countclear.innerHTML = products.length;

}




function clearbtn(){
  let tr = document.querySelectorAll('tr');
  localStorage.clear();
  for(m = 1 ; m < tr.length ; m++){
    tr[m].remove();
  }
 
}

let delete_item = (i) =>{
  products.splice(i,1);
  localStorage.products = JSON.stringify(products);

  let tr1 = document.querySelectorAll('tr');
  for(x = 1 ; x < tr1.length ; x++){
    tr1[x].remove();
  }
  renderData();
}


let update = (i)=>{

  mood = "update";
  globalID = i;
  titel.value = products[i].titel;
  allcost[0].value = products[i].price;
  allcost[1].value = products[i].tax;
  allcost[2].value = products[i].discount;
  allcost[3].value = products[i].total;
  department.value = products[i].department;

  count.classList.add('none');
  btn_create.innerHTML = `Update Data : ${i+1}`;

}

renderData();

btn_create.addEventListener('click',creatObject);



