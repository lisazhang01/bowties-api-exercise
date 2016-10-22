$(document).ready(function (){

//Render all bowties
  var generateIndex = function (bowties) {
    var newElem = "";

    for (var i = 0; i < bowties.length; i++) {
      newElem += '<div class="col-sm-6 col-md-4   menu"><div class="thumbnail"><img src="" alt=""><div class="caption">' +
                    '<h3>' +
                      bowties[i].material +
                      ' - ' +
                      bowties[i].pattern +
                    '</h3>' +
                  '<p>...</p><p><button type="button" class="btn btn-primary btn-lg more" data-toggle="modal" data-target="#myModal">More</button></p></div></div></div>';
    }

    newElem = '<div class="row">' + newElem + '</div>';

    $('.container').append(newElem);
  };

//Get json of all bowties from /api/bowties and redner in index
  $.ajax({
    url: '/api/bowties',
    method: 'GET'
  }).done(function(resp){
    generateIndex(resp);
  });

//Render one bowtie in modal
  var generateBowtie = function(bowtie) {
    var showOne = "";

    showOne = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">' +bowtie.material +
      ' - ' +
      bowtie.pattern +
      '</h4></div><div class="modal-body">' +
      "Style: " + bowtie.style +
      "$ " + bowtie.retail_price +
      '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Edit</button></div></div></div></div>'

    $('body').append(bowtie);
  };


  $('.more').click(function(e) {
    e.preventDefault();
    var bowtie = <%= %>;

    $.ajax({
      url: '/api/bowties',
      method: 'GET'
    }).done(function(resp){
      generateBowtie(resp);
    });


  })


}); //end doc ready



