var storageManager = (function () {

    var my = {};

    my.get = function (key) {
        return localStorage.getItem(key);
    }
    my.put = function (key, value) {
        return localStorage.setItem(key, value);
    }
    my.delete = function (key) {
        return localStorage.removeItem(key);
    }
    
    return my;

}());

var urlStorage = (function (storage) {
    var my = {};
    
    var urlKey = "urlmemolist";
    
    if( !storage.get(urlKey) ){
    	storage.put(urlKey, JSON.stringify([]));
    }
    
    my.getUrlList = function(){
    	return JSON.parse(storage.get(urlKey));
    };
    
    my.setUrlMemo = function(title, url){
    	var urlList = JSON.parse(storage.get(urlKey));
    	urlList.push({title: title, url: url});
    	storage.put(urlKey, JSON.stringify(urlList));
    };
    
    my.removeUrlMemo = function(index){
    	var urlList = JSON.parse(storage.get(urlKey));
    	urlList.splice(index, 1);
    	storage.put(urlKey, JSON.stringify(urlList));
    };
    
    return my;
}(storageManager));
