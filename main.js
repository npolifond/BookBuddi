$(document).ready(function() {
  var title;
  var author;
  var img;
  var description;
  var purchase;

  $("#searchform").submit(function() {
    const searchTerm = $("#titleName").val();
    const selection = $('input[name="search"]:checked').val();

    if (searchTerm === '') {
      alert("Search Bar is empty");
    } else {
      switch (selection) {
        case 'ISBN10':
          if (validIsbn(searchTerm)) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${searchTerm}`)
              .then(response => response.json())
              .then(data => {
                for(i=0;i<data.items.length;i++){
                  title=$('<h1 class="tile">'+data.items[i].volumeInfo.title+ '</h1>');
                  author=$('<h3 class="author">'+data.items[i].volumeInfo.authors+ '</h3>');
                  description=$('<p class="desc">'+data.items[i].volumeInfo.description+ '</p>');
                  img=$('<img class="imgNail" id="thumbnail" src="'+data.items[i].volumeInfo.imageLinks.thumbnail+'"><br><a href="'+data.items[i].volumeInfo.imageLinks.thumbnail+'"><button id="selectButton" class="select">select</button> </a>');
                  purchase=$('<p class="img">'+data.items[i].saleInfo.buyLink+ '</p>');
                  
                  title.appendTo("#results");
                  author.appendTo("#results");
                  description.appendTo("#results");
                  img.appendTo("#results");
                  purchase.appendTo("#results");

                }
                console.log(data);
              })
              .catch(error => {
                alert('Error: Could not retrieve book information.');
            });
          } else {
            alert("ISBN10 entered incorrectly");
          }
          break;

        case 'title':
          if (searchTerm!=='') {
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodedSearchTerm}`)
              .then(response => response.json())
              .then(data => {
                for(i=0;i<data.items.length;i++){
                  title=$('<h1 class="tile">'+data.items[i].volumeInfo.title+ '</h1>');
                  author=$('<h2 class="author">'+data.items[i].volumeInfo.authors+ '</h2>');
                  description=$('<p class="desc">'+data.items[i].volumeInfo.description+ '</p>');
                  img=$('<img class="imgNail" id="thumbnail" src="'+data.items[i].volumeInfo.imageLinks.thumbnail+'"><br><a href="'+data.items[i].volumeInfo.imageLinks.thumbnail+'"><button id="selectButton" class="select">select</button> </a>');
                  purchase=$('<p class="img">'+data.items[i].saleInfo.buyLink+ '</p>');
                  
                  title.appendTo("#results");
                  author.appendTo("#results");
                  description.appendTo("#results");
                  img.appendTo("#results");
                  purchase.appendTo("#results");
                }
                console.log(data);
              })
              .catch(error => {
                alert('Error: Could not retrieve book information.');
            });
          }
          break;

        case 'author':
          if (searchTerm!=='') {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor${searchTerm}`)
            .then(response => response.json())
            .then(data => {
              for(i=0;i<data.items.length;i++){
                title=$('<h1 class="tile">'+data.items[i].volumeInfo.title+ '</h1>');
                author=$('<h2 class="author">'+data.items[i].volumeInfo.authors+ '</h2>');
                description=$('<p class="desc">'+data.items[i].volumeInfo.description+ '</p>');
                img=$('<img class="imgNail" id="thumbnail" src="'+data.items[i].volumeInfo.imageLinks.thumbnail+'"><br><a href="'+data.items[i].volumeInfo.imageLinks.thumbnail+'"><button id="selectButton" class="select">select</button> </a>');
                purchase=$('<p class="img">'+data.items[i].saleInfo.buyLink+ '</p>');
                
                title.appendTo("#results");
                author.appendTo("#results");
                description.appendTo("#results");
                img.appendTo("#results");
                purchase.appendTo("#results");
              }
              console.log(data);
            })
            .catch(error => {
              alert('Error: Could not retrieve book information.');
            });
          }
          break;

        default:
          alert('Please select a search category.');
          break;
      }
    }
    return false;
  });
});


$(document).ready(function() {
  $("button").click(function(){
    var catalog = $(this).attr("name");
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${catalog}`)
    .then(response => response.json())
    .then(data => {
      for(i=0;i<data.items.length;i++){
        title=$('<h5 class="tile">'+data.items[i].volumeInfo.title+ '</h5>');
        author=$('<h5 class="author">'+data.items[i].volumeInfo.authors+ '</h5>');
        description=$('<p class="desc">'+data.items[i].volumeInfo.description+ '</p>');
        img=$('<img class="imgNail" id="thumbnail"><br>+<a href='+data.items[i].volumeInfo.imageLinks.thumbnail+ '+ <button id="selectButton" class="select">select</button> </a>');
        purchase=$('<p class="img">'+data.items[i].saleInfo.buyLink+ '</p>');
        title.appendTo("#results");
        author.appendTo("#results");
        description.appendTo("#results");
        img.appendTo("#results");
        purchase.appendTo("#results");
      }
      console.log(data);
    })

  });

});

function validIsbn(ISBN) {
  ISBN = ISBN.replace(/[-\s]/g, "");

  if (ISBN.length !== 10) {
    return false;
  }

  if (!/^\d+$/.test(ISBN)) {
    return false;
  }

  return true;
}
