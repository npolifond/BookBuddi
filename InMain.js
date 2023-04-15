
//when user selects catalog catergories it should display each title under following catergories

document.

function search(){
    var param={};

    var options= document.querySelector('input[name="search"]:checked').value;
     param.options=options

    var input=document.getElementById('titleName').value;
    param.input=input;

    if(options==opISBN){
       if(validIsbn(options)==true) ;
        return null
    }
console.log(param)
    return param;
}
function validIsbn(ISBN){
    ISBN=ISBN.replace(/[-\s]/g, "");

    if(ISBN.length!==10){
        return false;
    }
    if(!/^\d+$/.test(ISBN)){
        return false
    }
    return true;
}







//search when user selects, author, isbn10, ... it searches based on only when requirement
