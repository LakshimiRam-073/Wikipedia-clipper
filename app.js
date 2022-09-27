

function start(){
    const endpoint = 'https://en.wikipedia.org/w/api.php?';
    const params = {
        origin: '*',
        format: 'json',
        action: 'query',
        prop: 'extracts',
        exchars: 250,
        exintro: true,
        explaintext: true,
        generator: 'search',
        gsrlimit: 20,
    };


var button=document.getElementById("Search");
const data1 = document.getElementById("results");
const headd=document.getElementById("head");
const ext=document.getElementById("ext");


button.onclick= async()=>{
    data1.innerHTML='';
    let enteredSearch =document.getElementById("enterSearch").value;
    params.gsrsearch=enteredSearch;
  const {data}=await axios.get(endpoint, { params });
  console.log(data);
  
  const gatherData = pages => {
    const results = Object.values(pages).map(page => ({
        pageId: page.pageid,
        title: page.title,
        intro: page.extract,
    }));
    results.forEach(result=>{
       data1.innerHTML+=`<div class="results__item">
       <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class="card animated bounceInUp"style="text-decoration:none;">
           <h2 class="results__item__title" style="color:black">${result.title}</h2>
           <p class="results__item__intro" style="color:black; padding: 2px;" >${result.intro}</p>
       </a>
   </div>
       `
        
    });
    
   
}
  
  gatherData(data.query.pages);
  
}

}
window.onload=()=>{
    start();
}