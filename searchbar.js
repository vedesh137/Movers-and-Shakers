const search =() =>{
  const searchbox = document.getElementById("search-input").value.toUpperCase();
  const storeitems = document.getElementById("music")
  const product = document.querySelectorAll(".music-box")
  const pname = storeitems.getElementsByTagName("h2")

  for (var i=0; i < pname.length; i++ ){
    let match = product[i].getElementsByTagName('h2')[0];
    if (match){
      let textvalue = match.textContent || match.innerHTML
        if(textvalue.toUpperCase().indexOf(searchbox) > -1){
          product[i].style.display = "";
        }else{
          product[i].style.display = "none";
        }
    }
  }
}