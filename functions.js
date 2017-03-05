function requestArticles(keywork) {
	var request = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cextracts&inprop=url&generator=search&exsentences=1&exlimit=10&exintro=1&gsrnamespace=0&gsrlimit=10&origin=*&gsrsearch=";
	$.getJSON(request+keywork, function(data) {
		$("#articles").html("");
		if (data.query) {
			for (var page in data.query.pages) {
				var title = data.query.pages[page].title
				var url = data.query.pages[page].fullurl;
				var extract = data.query.pages[page].extract.replace(/<[^>]*>/gi,"");
				$("#articles").append("<li class='article'><a href='" + url + "' target='_blank'><h4>" + title + "</h4>" + extract + "</li></a>");
			}
		}
	});
}

$( document ).ready(function() {
	$('#input').each(function() {
		var elem = $(this);
		elem.data('oldVal', elem.val());
		elem.bind("propertychange change click keyup input paste", function(event){
			if (elem.data('oldVal') != elem.val()) {
				elem.data('oldVal', elem.val());
				requestArticles(elem.val());
			}
		});
	});
});