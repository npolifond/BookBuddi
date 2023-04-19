
//when user selects catalog catergories it should display each title under following catergories

function search(){
    var param={};

    var options= document.querySelector('input[name="search"]:checked').value;
     param.options=options

    var input=document.getElementById('titleName').value;
    param.input=input;

    if(options==opISBN){
       if(validIsbn(options)==true){
return null
       }
        
    }else{
        alert("ISBN10 entered incorrectly. Please try again")
    }


console.log(param)
    return param;
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var searchParams = search();
    if (searchParams) {
      // Build the API endpoint URL
      var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(searchParams.title);
      
      // Use the apiUrl to make the API request
      fetch(apiUrl)
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(function(data) {
          // Handle the data returned from the API
          console.log(data);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  });
  
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
