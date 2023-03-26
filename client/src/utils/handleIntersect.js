export function handleIntersect(enteries, observer){
    enteries.forEach((entry)=>{
       if(entry.isIntersecting){
         entry.target.classList.add("animate-section")
         entry.target.classList.remove("d-status")
         console.log(entry)
       }else{
         entry.target.classList.remove("animate-section")
         entry.target.classList.add("d-status")
       }
    } )
  
   }
 