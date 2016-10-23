$(document).ready(function (){

//Render all bowties
  var generateIndex = function (bowties) {
    var bowtieElem  = "";

    for (var i = 0; i < bowties.length; i++) {

      bowtieElem += '<div class="col-sm-6 col-md-4 menu"><a href="#" class="thumbnail"><div class="caption">' +
        '<h3>' +
        bowties[i].id +
        '. ' +
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
        '</li><li> Product ID: <span id="id">' +
        bowties[i].id +
        '</span></li></ul></div><button type="button" class="btn btn-primary btn-lg more" data-target="#myModal">More</button></div></div></div>';
    }

    $('.bowties').append(bowtieElem); //Append to index.html
  };


//Show details of one bowtie in modal
  function showDetails() {

    $('.thumbnail').on('click', function(){
      var infoModal = $('#myModal'); //_modal

      var titleData = $(this).find('h3').html();
      var htmlData  = $(this).find('.profile').html();

      infoModal.find('.modal-title').html(titleData);
      infoModal.find('.modal-body').html(htmlData);

      infoModal.modal('show');
      return false;

    })
  };

//Get json of bowties from /api/bowties and render in index
  $.ajax({
    url   : '/api/bowties',
    method: 'GET'
  }).done(function(resp){
    generateIndex(resp);
    showDetails();
  });


//Create new bowtie form
  function newBowtieForm() {

    $('#new-bowtie').on('click', function(e){
      var newModal = $('#myModalCreate'); //_modalCreate
      e.preventDefault();

      newModal.modal('show');
      return false;
    });
  };

  newBowtieForm();

//Save input as json file and post to /api/bowties

  function sendNewBowtie() {
    var newBowtieParams = {
      material       : $('#material').val(),
      pattern        : $('#pattern').val(),
      style          : $('#style').val(),
      image_url      : $('#url').val(),
      wholesale_price: $('#wholesalePrice').val(),
      retail_price   : $('#retailPrice').val()
    };

    $.ajax ({
      url     : '/api/bowties',
      method  : 'POST',
      data    : newBowtieParams,
      dataType: 'json'
    }).done(function(resp){
      window.location.href = '/bowties'
      alert("New Bowtie saved to db");
    }).fail(function(resp){
      alert("failed to save");
    });
  };

//On Click send json to api
  function clickToSave() {
    $('#save').on('click', function(){
    sendNewBowtie();
    // generateIndex();
    })
  };

  clickToSave();

//Delete a bowtie from modal
  function findOneToDelete() {
    var thisOne = {
      id: $('#id').val()
    };

    $.ajax ({
      url     : '/api/bowties/:id',
      method  : 'DELETE',
      data    : thisOne,
      dataType: 'json'
    }).done(function(resp){
      window.location.href = '/bowties'
      alert("Bowtie is deleted");
    }).fail(function(resp){
      alert("Delete unsuccessful");
    });
  };

  function clickToDelete() {
    $('#delete').on('click', function(){
      findOneToDelete();
    })
  };

  clickToDelete();

});
//end doc ready


