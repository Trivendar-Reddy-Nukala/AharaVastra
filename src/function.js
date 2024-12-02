console.log("fjsdjfks")


let dataset = [
    {
        colour: "warning",
        info: "JNTUH One time chance December exam results notification",
        link:"https://www.gctcportal.in/2024/02/jntuh-btech-one-time-chance-exam.html"
        
        


    },
    {
        colour: "primary",
        info: " Transport Arrangements for 16-09-2023",
        link:"https://www.gctcportal.in/2024/02/jntuh-btech-one-time-chance-exam.html"
        
        


    }
   ];

console.log(dataset)



function showFoods(data) {

    let hs = ``;
    for (let i = 0; i < data.length; i++) {
        hs = hs + `
            
  
  
  
          
<div class="alert alert-${data[i].colour}" role="alert">
<span>18-05-2024  </span>| <span > ${data[i].data} </span><a href="${data[i].link}" class="text-primary"> Available here</a>

</div>
  
            `;
    }
    document.querySelector(".data").innerHTML = hs;


}


showFoods(dataset)
