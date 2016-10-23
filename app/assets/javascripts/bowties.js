$(document).ready(function (){

//Render all bowties
  var generateIndex = function (bowties) {
    var bowtieElem = "";

    for (var i = 0; i < bowties.length; i++) {

      bowtieElem += '<div class="col-sm-6 col-md-4 menu"><a href="#" class="thumbnail"><div class="caption">' +
        '<h3>' +
        bowties[i].material +
        ' - ' +
        bowties[i].pattern +
        '</h3>' +
        '<p>Open to see more details</p><div class="profile hide"><img class="img-responsive img-rounded"src="' +
        bowties[i].image_url +
        '" alt=""><ul><li> Style: '+
        bowties[i].style +
        '</li><li> Retail Price $ ' +
        bowties[i].retail_price +
        '</li><li> Wholesale Price $ ' +
        bowties[i].wholesale_price +
        '</li></ul></div><button type="button" class="btn btn-primary btn-lg more" data-target="#myModal">More</button></div></div></div>';
    }

    $('.bowties').append(bowtieElem); //Append to index.html
  };


//Show details of one bowtie in modal
  function showDetails() {
    var infoModal = $('#myModal'); //_modal
    $('.thumbnail').on('click', function(){

      var titleData = $(this).find('h3').html();
      var htmlData  = $(this).find('.profile').html();
      // var btnOne    = "Edit";
      // var btnTwo    = "Delete";

      infoModal.find('.modal-title').html(titleData);
      infoModal.find('.modal-body').html(htmlData);
      // infoModal.find('.first').text(btnOne);
      // infoModal.find('.second').text(btnTwo);
      infoModal.modal('show');
      return false;

    })
  };

//Get json of bowties from /api/bowties and render in index
  $.ajax({
    url: '/api/bowties',
    method: 'GET'
  }).done(function(resp){
    generateIndex(resp);
    showDetails();
  });

//Create new bowtie
  function newBowtieForm() {
    var newModal = $('#myModalCreate'); //_modalCreate

    $('#new-bowtie').on('click', function(e){
      e.preventDefault();

      newModal.modal('show');
      return false;
    })

  }

newBowtieForm();


});
//end doc ready



