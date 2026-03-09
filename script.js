let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let salary = localStorage.getItem("salary") || 0;

let chart;

function saveSalary(){

salary=document.getElementById("salary").value;

localStorage.setItem("salary",salary);

displayExpenses();

}

function addExpense(){

let date=document.getElementById("date").value;
let category=document.getElementById("category").value;
let name=document.getElementById("name").value;
let amount=document.getElementById("amount").value;

if(!date || !name || !amount) return;

expenses.push({date,category,name,amount});

localStorage.setItem("expenses",JSON.stringify(expenses));

displayExpenses();

document.getElementById("name").value="";
document.getElementById("amount").value="";

}

function deleteExpense(index){

let listItems=document.querySelectorAll("#list li");

let item=listItems[index];

item.classList.add("removing");

setTimeout(()=>{

expenses.splice(index,1);

localStorage.setItem("expenses",JSON.stringify(expenses));

displayExpenses();

},300);

}

function displayExpenses(){

let list=document.getElementById("list");

list.innerHTML="";

let total=0;

let categoryTotals={};

expenses.forEach((e,index)=>{

let month=new Date(e.date).getMonth();

let currentMonth=new Date().getMonth();

if(month===currentMonth){

let li=document.createElement("li");

li.innerHTML=e.date+" | "+e.category+" | "+e.name+" | ₹"+e.amount+
"<button onclick='deleteExpense("+index+")'>X</button>";

list.appendChild(li);

total+=Number(e.amount);

categoryTotals[e.category]=(categoryTotals[e.category]||0)+Number(e.amount);

}

});

document.getElementById("total").textContent=total;

let balance=salary-total;

document.getElementById("balance").textContent=balance;

updateChart(categoryTotals);

}

function updateChart(categoryTotals){

let labels=Object.keys(categoryTotals);

let data=Object.values(categoryTotals);

let ctx=document.getElementById("chart").getContext("2d");

if(chart){
chart.destroy();
}

chart=new Chart(ctx,{

type:"doughnut",

data:{
labels:labels,
datasets:[{
data:data
}]
},

options:{
plugins:{
legend:{
position:"bottom"
}
}
}

});

}

displayExpenses();