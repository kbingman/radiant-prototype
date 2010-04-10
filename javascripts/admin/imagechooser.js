var ImageChooserBehavior = Behavior.create({       
  
  onclick: function(event) {     
    var imageUrl = event.target.readAttribute('href');
    this.insertAtCaret(imageUrl);
    return false;
  },   
  
  insertAtCaret: function(imageUrl) {   
    var pageParts = $$('.page'), activeTextArea = '';        
    pageParts.each(function(part){
      if (part.visible()) {
        activeTextarea = part.select('textarea')[0];          
      }
    });    
    
    var part = activeTextarea.id.gsub('_content','');
    var filter = $F(part + "_filter_id");    
    
    // Sets the value to be inserted. This will need to be modified according to Filter.     
    var value = ''; 
    console.log('Filter:' + filter)
    switch(filter) { 
     case "Textile" :   
       value = '!' + imageUrl + '!';     
       break; 
     case "Markdown" :
       value = '![alt text]('  + imageUrl + ')'; 
       break;    
     case "SmartyPants" :
       value = '<img src="' + imageUrl + '" alt="image" />';  
       break;    
     default : 
       value = '<img src="' + imageUrl + '" alt="image" />';   
       break;
    }         
    
    
    // Internet Explore  support
    if (document.selection) {
      activeTextarea.focus();
      sel = document.selection.createRange();
      sel.text = value;
    }
    // moz/webikit support
    else if (activeTextarea.selectionStart || activeTextarea.selectionStart == '0') {
      var startPos = activeTextarea.selectionStart;
      var endPos = activeTextarea.selectionEnd;
      activeTextarea.value = activeTextarea.value.substring(0, startPos)
                    + value
                    + activeTextarea.value.substring(endPos, activeTextarea.value.length);
    } else {
      activeTextarea.value += value;
    }
  }
  
}); 