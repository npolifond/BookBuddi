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
            $.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`, function(response) {
              for(i=0;i<response.items.length;i++){

                title=$('<h5 class="tile">'+response.items[i].volumeInfo.title+ '</h5>');
                author=$('<h5 class="author">'+response.items[i].volumeInfo.authors+ '</h5>');
                description=$('<p class="desc">'+response.items[i].volumeInfo.description+ '</p>');
                img=$('<img class="imgNail" id="thumbnail"><br>+<a href='+response.items[i].volumeInfo.imageLinks.thumbnail+ '+ <button id="selectButton" class="select">select</button> </a>');
                purchase=$('<p class="img">'+response.items[i].saleInfo.buyLink+ '</p>');
               // imag.attr('src')
               //https://codepen.io/Kicky/pen/ZxvvqE
               
              }
              console.log(response);
            }).fail(function() {
              alert('Error: Could not retrieve book information.');
            });
          } else {
            alert("ISBN10 entered incorrectly");
          }
          break;

        case 'title':
          if (validIsbn(searchTerm)) {
            alert("ISBN10 has been entered. Please enter correct input.");
          } else {
            $.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`, function(response) {
              for(i=0;i<response.items.length;i++){

                title=$('<h5 class="tile">'+response.items[i].volumeInfo.title+ '</h5>');
                author=$('<h5 class="author">'+response.items[i].volumeInfo.authors+ '</h5>');
                description=$('<p class="desc">'+response.items[i].volumeInfo.description+ '</p>');
                img=$('<img class="imgNail" id="thumbnail"><br>+<a href='+response.items[i].volumeInfo.imageLinks.thumbnail+ '+ <button id="selectButton" class="select">select</button> </a>');
                purchase=$('<p class="img">'+response.items[i].saleInfo.buyLink+ '</p>');
               // imag.attr('src')
               //https://codepen.io/Kicky/pen/ZxvvqE
               
              }
              console.log(response);
            }).fail(function() {
              alert('Error: Could not retrieve book information.');
            });
          }
          break;

        case 'author':
          if (validIsbn(searchTerm)) {
            alert("ISBN10 has been entered. Please enter correct input.");
          } else {
            $.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`, function(response) {
              for(i=0;i<response.items.length;i++){

                title=$('<h5 class="tile">'+response.items[i].volumeInfo.title+ '</h5>');
                author=$('<h5 class="author">'+response.items[i].volumeInfo.authors+ '</h5>');
                description=$('<p class="desc">'+response.items[i].volumeInfo.description+ '</p>');
                img=$('<img class="imgNail" id="thumbnail"><br>+<a href='+response.items[i].volumeInfo.imageLinks.thumbnail+ '+ <button id="selectButton" class="select">select</button> </a>');
                purchase=$('<p class="img">'+response.items[i].saleInfo.buyLink+ '</p>');
               // imag.attr('src')
               //https://codepen.io/Kicky/pen/ZxvvqE

              }
              console.log(response);
            }).fail(function() {
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

/* functions for buttons */
$(document).ready(function() {




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
