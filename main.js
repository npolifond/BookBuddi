$(document).ready(function() {
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
