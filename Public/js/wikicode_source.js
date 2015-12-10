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
$('#fill_form_fields').prop('disabled',true);
$('#levelnumber').keyup(function(){
  var value = $('#levelnumber').val();
  if((parseFloat(value) == parseInt(value)) && !isNaN(value) && (parseInt(value) > 0))
    $('#fill_form_fields').prop('disabled',false);
  else
    $('#fill_form_fields').prop('disabled',true);
})

//Obtains the Level Stats to fill in the fields, in wikicode.jade
//The modules to have generateLevelStats() run
//var htmlToJson = require('../../node_modules/html-to-json/lib/htmlToJson.js');
var htmlToJson = require('html-to-json');
$('#fill_form_fields').click(function() {
  
    // First generate the nps image.
    if ($('#levelnumber').val() !== "") {
        var url = "http://www.flashflashrevolution.com/tools/nps_image.php?id=" + parseInt($('#levelnumber').val());
        $('#nps_generator').attr('src', url);
    }
  
    // Then fill the input fields.
    var url = 'http://www.flashflashrevolution.com/levelstats.php?level=' + parseInt($("#levelnumber").val());
    var promise = htmlToJson.request(url, {
        'title': ['h2', function ($h2) {
            return $h2.text();
        }],
        'song_info': ['td[align="left"]', function ($td) { //FFR's code is BLEH but so is this minor hack
            return $td.next().text();
        }]
    }, function (err, result) {
        //console.log(result);
        //put the info in the corresponding fields
        $("#songname").val(result.title[1]);
        $("#musician").val(result.song_info[0]);
        $("#genre").val(result.song_info[5]);
        $("#category").val(result.song_info[4]);
        $("#stepartist").val(result.song_info[2]);
        $("#filereleasedate").val(result.song_info[7]);
        $("#songlength").val(result.song_info[8]);
        $("#difficulty").val(result.song_info[6]);
    });
    
    //var url = 'http://flashflashrevolution.com/levelstats.php?level=' + parseInt($("#levelnumber").val());
    /*
    $.getJSON(url + '?jsoncallback=?', { format: "json" }, function(data) { 
      JSON = data;
      alert('no');
    });
    
    $.ajax({                                                                                                                                                                                                        
      type: 'GET',                                                                                                                                                                                                 
      url: url,
      async: true,
      //dataType: 'json',                                                                                                                                                                                                
      success: function(data) {
        parsed_elements = $.parseHTML(data, document, true);
      },                                                                                                                                                                                       
      error: function() { console.log('Uh Oh!'); },
      //jsonp: 'jsonp'                                                                                                                                                
    });
    */
});