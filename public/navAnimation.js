//I wrote this code a long time ago, but I looked up the scources I might have used for it
$(document).ready(function(){
  document.getElementById("navButton").addEventListener("click", function(){
      const toggleElem = document.getElementsByClassName("toggle");
      if (toggleElem[0].style.maxHeight === ""){
        //https://www.w3schools.com/jsref/met_document_getelementsbyclassname.asp
        let navElems = document.getElementsByClassName("sizer");
        //https://www.w3schools.com/jsref/prop_style_height.asp
        toggleElem[0].style.maxHeight = navElems.length*40 + "px";
      }
      else{
        toggleElem[0].style.maxHeight = "";
      }
  });
});
