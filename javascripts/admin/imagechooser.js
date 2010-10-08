var ImageChooserBehavior = Behavior.create({       
  
  onclick: function(event) { 
    if(event.target.hasClassName('action')){
      var imageUrl = event.target.readAttribute('href');  
      var row = event.findElement('tr');   
      var imageTitle = row.select('td.name a')[0].innerHTML;
      this.insertAtCaret(imageUrl, imageTitle);
      return false;
    }    
  },   
  
  insertAtCaret: function(imageUrl, imageTitle) {   
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
       value = '![' + imageTitle + ']('  + imageUrl + ')'; 
       break;    
     default : 
       value = '<img src="' + imageUrl + '" alt="' + imageTitle + '" />'; 
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