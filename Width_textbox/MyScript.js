//Get the max width of the div (ex outerDiv)
//you will need it so that you dont overstep the textbox width
// added -10 so the textbox dosnt go exactly to the div´s side 
var max_width = document.getElementById("outerDiv").getBoundingClientRect().width -10;

var el = document.getElementById("txt_box");
var hide_el = document.getElementById("hide_span");

//Get the standard width of the textbox you have in your website
//We need the fractional value from the width, therefore we use getBoundingClientRect()
//If you want a integer value from the width instead, you can use clientWidth
var  standardWidth = el.getBoundingClientRect().width; 

function changeWidth (el) {
    hide_el.style.display = "inline"; //inline is defualt for the display function in CSS
    //textContent supports from IE 9, works on major browsers
    hide_el.textContent = el.value;
    var txt_box_width = hide_el.getBoundingClientRect().width;
    hide_el.style.display = "none";

    //As long as the textbox (ex txt_box) width is smaller than the standardWidth
    //use this to not decrease the textbox width
    if(standardWidth > txt_box_width) {
        el.style.width = standardWidth + "px";
    }
    //Increase the width for the textBox (ex txt_box) if the width
    //is bigger than the standard width
    else {
        //As long as textbox width doesn't increases more than max width,
        //increase the width for the textbox (ex txt_box)
        if (max_width > txt_box_width) {
            //I add 23  + 3 becuase i need to take in account with the 
            //padding left/right for the svg/ thats inside the textbox
            el.style.width = (txt_box_width+23+3) + "px";

            if (max_width < (txt_box_width+23+3)) {
                //Annars kommer du utanför några gånger! (under test!) 
                el.style.width = max_width + "px";
            }
        }
        //if the textbox width is bigger than the max set as defualt the max width
        //ex: If the user is pressing down a key without releasing it since its triggered by "key up"
        else {
            el.style.width = max_width + "px";
        }
    }
}

//From DOM lever 2
//You need to use keyup or else it will not "read" the letters correct.
if (el.addEventListener) {
    el.addEventListener("keyup",function(e)
    {changeWidth(el)},false);
} else { 
    // For IE 5- 8
    el.attachEvent("keyup",function(e) 
    {changeWidth(el)});
}

