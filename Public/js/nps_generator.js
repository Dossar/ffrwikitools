//generates the NPS image
function generateNPSImage(){
  var url = "http://www.flashflashrevolution.com/tools/nps_image.php?id=" + $('#levelnumber').val();
  $('#nps_generator').attr('src', url);
}