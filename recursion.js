var data = [
	{ id: 387, text: 'Animals', parent_id: 0 },
	{ id: 8745, text: 'Mammals', parent_id: 387 },
	{ id: 987345, text: 'Dogs', parent_id: 8745 },
	{ id: 2387, text: 'Plants', parent_id: 0 }
];
var parent = [];

//recursive function to build each level of output
function processData(arr, parent) {
    var output = [];
    for(var i in arr) {
        if(arr[i].parent_id == parent) {
            var children = processData(arr, arr[i].id)
            if(children.length>0) {
                arr[i].children = children
            }
            output.push(arr[i])
        }
    }
    return output
}
//create final data to pass into template by calling it
var finalData = processData(data,parent);
function renderMarkup(data){
	var html = "<ul>";
	function helperFunc(item) {
    var str = "<li>"+ item.text;
    if (!item.children){
    	str =str +"</li>";
    }else{
    	str = str +"<ul>";
      for (j in item.children){
        str =str+ helperFunc(item.children[j]);
      }
      str =str+ "</ul></li>";
     }
    return str
  }
  for (i in data){
  	html += helperFunc(data[i]);
  }

  html+= "</ul>";
  document.getElementsByTagName('body')[0].innerHTML = html;
}
//call second solution to create HTML string per your second suggestion earlier
renderMarkup(finalData);