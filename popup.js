$(function() {
	$('#submit-ok').click(function() {
		var title = $('#title-input').val();
		if(title == undefined || title == ""){
			alert("タイトルを入力してください");
		}
		else{
			var url;
			chrome.tabs.getSelected(null,function(tab) {
			  	urlStorage.setUrlMemo(title, tab.url);
			  	
			  	$('#title-input').val("");
				drawUrlList(urlStorage.getUrlList());
			});
  		}
	});
	
	$('#submit-cancel').click(function() {
		window.close();
	});
	
	chrome.tabs.getSelected(null,function(tab) {
	  	$('#title-input').val(tab.url);
	  	$('#tab-url').text(tab.url);
	});
	
  	drawUrlList(urlStorage.getUrlList());
  	
	function drawUrlList(urlList){
		$('#urllist').empty();
		
		var i;
		for(i = urlList.length - 1; i >= 0; i--){
			listitem = CreateListItem(urlList[i], i);
			$('#urllist').append(listitem)
		}
	}
	
	function CreateListItem(urlitem, itemIndex){
		var listitem = $('<li>');
		var linkelm = $('<a>');
		linkelm.attr('href', urlitem.url);
		linkelm.text(urlitem.title);
		linkelm.click(function(){
			chrome.tabs.create(
				{url: urlitem.url},
			    function(tab) {
			        window.close(); 
			    }
			);
		});
		
		var delelm = $('<a>');
		delelm.attr('href', "#");
		delelm.text("delete");
		delelm.click(function(){
			if(confirm("削除しますか？")){
				urlStorage.removeUrlMemo(itemIndex);
				drawUrlList(urlStorage.getUrlList());
			}
		});
		
		listitem.append(linkelm);
		listitem.append(" [");
		listitem.append(delelm);
		listitem.append("]");
		
		return listitem;
	}
});


