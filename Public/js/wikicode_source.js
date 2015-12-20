// Function to make WikiCode (changed to anonymous function to work with browserify)
$('#make_wikicode').click(function (){
  // Array to hold ID names, string to hold Wiki Code
  //var ids = ["levelnumber", "songname", "musician", "genre", "category", 
  //            "stepartist", "filereleasedate", "songlength", "difficulty", "notecount", "nps", "bpm"], wikicode = "";
  
  // Strings to hold song and file Wiki Code.
  var swikicode = "{{Song\n", fwikicode = "{{File\n";
  
  // Create Wiki Code String for the Song Template in the WikiCode.
  swikicode += "| name            = " + $("#songname").val() + "\n";
  swikicode += "| image           = \n";
  swikicode += "| imagewidth      = \n";
  swikicode += "| originaltitle   = \n";
  swikicode += "| aka             = \n";
  swikicode += "| album           = \n";
  swikicode += "| composer        = \n";
  swikicode += "| musician        = [[" + $("#musician").val() + "]]\n";
  swikicode += "| arranger        = \n";
  swikicode += "| performer       = \n";
  swikicode += "| remixer         = \n";
  swikicode += "| featuring       = \n";
  swikicode += "| songrelease     = \n";
  swikicode += "| genre           = " + $("#genre").val() + "\n}}\n";
  
  // File Template WikiCode.
  fwikicode += "| name            = " + $("#songname").val() + "\n";
  fwikicode += "| image           = \n";
  fwikicode += "| imagewidth      = \n";
  fwikicode += "| levelnumber     = " + $("#levelnumber").val() + "\n";
  fwikicode += "| stepartist      = [[" + $("#stepartist").val() + "]]\n";
  fwikicode += "| filerelease     = " + $("#filereleasedate").val() + "\n";
  fwikicode += "| songlength      = " + $("#songlength").val() + "\n";
  fwikicode += "| difficulty      = " + $("#difficulty").val() + "\n";
  fwikicode += "| nps             = " + $("#nps").val() + "\n";
  fwikicode += "| category        = " + $("#category").val() + "\n";  
  fwikicode += "| bpm             = " + $("#bpm").val() + "\n}}\n";
  
  // Update Wiki Code textarea
  $('#wikicode').val(swikicode + fwikicode);
});

//Checks if the level ID is an integer, and enables/disables the button accordingly
$('#levelnumber').keyup(function(){
  var value = $('#levelnumber').val();
  if((parseFloat(value) == parseInt(value)) && !isNaN(value) && (parseInt(value) > 0))
    $('#fill_form_fields').prop('disabled',false);
  else
    $('#fill_form_fields').prop('disabled',true);
})
