$(document).ready(function() {
  var title;
  var author;
  var img;
  var description;
  var purchase;
  const tableBody = $("#results");

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
                  const row = $("<tr>");

                  const imgCell = $("<td>").html(`<img class="imgNail" id="thumbnail" src="${data.items[i].volumeInfo.imageLinks.thumbnail}">`);
                  const titleCell = $("<td>").text(data.items[i].volumeInfo.title);
                  const authorCell = $("<td>").text(data.items[i].volumeInfo.authors);
                  const descCell = $("<td>").text(data.items[i].volumeInfo.description);
                  const purchaseCell = $("<td>").text(data.items[i].saleInfo.buyLink);
          
                  imgCell.appendTo(row);
                  titleCell.appendTo(row);
                  authorCell.appendTo(row);
                  descCell.appendTo(row);
                  purchaseCell.appendTo(row);
                  $('#resultsBody').append(row);

                  row.appendTo(tableBody);

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
                  const row = $("<tr>");

                  const imgCell = $("<td>").html(`<img class="imgNail" id="thumbnail" src="${data.items[i].volumeInfo.imageLinks.thumbnail}">`);
                  const titleCell = $("<td>").text(data.items[i].volumeInfo.title);
                  const authorCell = $("<td>").text(data.items[i].volumeInfo.authors);
                  const descCell = $("<td>").text(data.items[i].volumeInfo.description);
                  const purchaseCell = $("<td>").text(data.items[i].saleInfo.buyLink);
          
                  imgCell.appendTo(row);
                  titleCell.appendTo(row);
                  authorCell.appendTo(row);
                  descCell.appendTo(row);
                  purchaseCell.appendTo(row);
                  $('#resultsBody').append(row);

                  //not being used
                 // row.appendTo("#tableBody");
                 row.appendTo(tableBody);


                }
               // window.location.href = "resultPr.html";
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
                const row = $("<tr>");

                const imgCell = $("<td>").html(`<img class="imgNail" id="thumbnail" src="${data.items[i].volumeInfo.imageLinks.thumbnail}">`);
                const titleCell = $("<td>").text(data.items[i].volumeInfo.title);
                const authorCell = $("<td>").text(data.items[i].volumeInfo.authors);
                const descCell = $("<td>").text(data.items[i].volumeInfo.description);
                const purchaseCell = $("<td>").text(data.items[i].saleInfo.buyLink);
        
                imgCell.appendTo(row);
                titleCell.appendTo(row);
                authorCell.appendTo(row);
                descCell.appendTo(row);
                purchaseCell.appendTo(row);
                $('#resultsBody').append(row);


                  row.appendTo(tableBody);

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
        const row = $("<tr>");

        const imgCell = $("<td>").html(`<img class="imgNail" id="thumbnail" src="${data.items[i].volumeInfo.imageLinks.thumbnail}">`);
        const titleCell = $("<td>").text(data.items[i].volumeInfo.title);
        const authorCell = $("<td>").text(data.items[i].volumeInfo.authors);
        const descCell = $("<td>").text(data.items[i].volumeInfo.description);
        const purchaseCell = $("<td>").text(data.items[i].saleInfo.buyLink);

        imgCell.appendTo(row);
        titleCell.appendTo(row);
        authorCell.appendTo(row);
        descCell.appendTo(row);
        purchaseCell.appendTo(row);
        $('#resultsBody').append(row);


        row.appendTo("#tableBody");

      }
      //window.location.href = "resultPr.html";
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
