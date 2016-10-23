$(document).ready(function (){

//Render all bowties
  var generateIndex = function (bowties) {
    var newElem = "";

    for (var i = 0; i < bowties.length; i++) {
      newElem += '<div class="col-sm-6 col-md-4 menu"><a href="#" class="thumbnail"><img src="" alt=""><div class="caption">' +
        '<h3>' +
        bowties[i].material +
        ' - ' +
        bowties[i].pattern +
        '</h3>' +
        '<p>...</p><div class="profile hide"><ul><li>'+bowties[i].style +
        '</li><li> $ ' +
        bowties[i].retail_price +
        '</li></ul></div><button type="button" class="btn btn-primary btn-lg more" data-target="#myModal">More</button></div></div></div>';

    }

    // allElem = '<div class="row">' + newElem + '</div>';

    $('.bowties').append(newElem);
  };


//Show details of one bowtie in modal
  function showDetails() {
    var infoModal = $('#myModal');
    $('.thumbnail').on('click', function(){
      var htmldata = $(this).find('.profile').html();
      infoModal.find('.modal-body').html(htmldata);
      infoModal.modal('show');
      return false;
    })
  };

//Get json of all bowties from /api/bowties and render in index
  $.ajax({
    url: '/api/bowties',
    method: 'GET'
  }).done(function(resp){
    generateIndex(resp);
    showDetails();
  });



});
//end doc ready



