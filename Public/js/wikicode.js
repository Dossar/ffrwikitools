// Function to make WikiCode
function makeWikiCode() {
  // Array to hold ID names, string to hold Wiki Code
  //var ids = ["levelnumber", "songname", "musician", "genre", "category", 
  //            "stepartist", "filereleasedate", "songlength", "difficulty", "notecount", "nps", "bpm"], wikicode = "";
  
  // Strings to hold song and file Wiki Code
  var swikicode = "{{Song\n", fwikicode = "{{File";
  
  // Create Wiki Code, song then file
  swikicode += "| name            = " + $("#songname").val() + "\n";
  swikicode += "| image           = \n| imagewidth      = \n| originaltitle   = \n| aka             = \n| album           = \n| composer        \n";
  swikicode += "| musician        = [[" + $("#musician").val() + "]]\n";
  swikicode += "| musician        = \n| arranger        = \n| performer       = \n| remixer         = \n| featuring       = \n| songrelease     = \n";
  swikicode += '| genre           = "' + $("#genre").val() + '"\n}}\n';
  
  fwikicode += "| name            = " + $("#songname").val() + "\n";
  fwikicode += "| image           = \n| imagewidth      = \n";
  fwikicode += "| levelnumber     = " + $("#levelnumber").val() + "\n";
  fwikicode += "| stepartist      = [[" + $("#stepartist").val() + "]]\n";
  fwikicode += "| filerelease     = " + $("#filereleasedate").val() + "\n";
  fwikicode += "| songlength      = " + $("#songlength").val() + "\n";
  fwikicode += "| difficulty      = " + $("#difficulty").val() + "\n";
  fwikicode += "| nps             = " + $("#nps").val() + "\n";
  fwikicode += '| category        = "' + $("#category").val() + '"\n';  
  fwikicode += "| bpm             = " + $("#bpm").val() + "\n}}\n";

  
  /*wikicode += "| levelnumber     = " + $("#levelnumber").val() + "\n";
  wikicode += "| name            = " + $("#songname").val() + "\n";
  wikicode += "| musician        = [[" + $("#musician").val() + "]]\n";
  wikicode += '| genre           = "' + $("#genre").val() + '"\n';
  wikicode += '| category        = "' + $("#category").val() + '"\n';
  wikicode += "| stepartist      = [[" + $("#stepartist").val() + "]]\n";
  wikicode += "| filerelease     = " + $("#filereleasedate").val() + "\n";
  wikicode += "| songlength      = " + $("#songlength").val() + "\n";
  wikicode += "| difficulty      = " + $("#difficulty").val() + "\n";
  wikicode += "| nps             = " + $("#nps").val() + "\n";
  wikicode += "| bpm             = " + $("#bpm").val() + "\n";*/
  
  // Update Wiki Code textarea
  $('#wikicode').val(swikicode + fwikicode);
  
  return;
}