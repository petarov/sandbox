var loadData = function(resource, callback){
	var xhr = new XMLHttpRequest();
    xhr.open('GET', resource+'.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
            	callback(null, JSON.parse(xhr.responseText));
            }
        }
    };
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send(null);
};
var cacheUpdate = function(){
	var appCache = window.applicationCache;
	appCache.update();
	if (appCache.status == window.applicationCache.UPDATEREADY){
	  	appCache.swapCache();
	}
	loadData('large/1', function(error, data){
		console.log(data.length);
	});
};

loadData('videos', function(error, data){
	console.log(data);
});

loadData('large/1', function(error, data){
	console.log(data.length);
});

var bind = function(){
	var btn = document.getElementById('resyncBtn');
	btn.addEventListener('click', function(e){
		cacheUpdate();
	});
};
window.onload = bind;

