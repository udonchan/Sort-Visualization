!function($, undefined){
    var $main_view;
    
    var array2view = function(list){
        return list.map(function(v){
            return Array.apply(null, Array(v)).map(function(){return '*'}).join('');
        }).join('<br />');
    };
    var bubbleSortItrBuilder = function(list){
        var myList = list.concat();
        var i = 0, j = list.length-1;
        return {
            hasNext : function(){
                return i < myList.length-1;
            },
            next : function(){
                if(myList[j] < myList[j-1]){
	                var tmp = myList[j];
	                myList[j] = myList[j-1];
	                myList[j-1] = tmp;
	            }
                j--;
                if(!(j>i)){
                    j = myList.length - 1;
                    i++;
                }
                return myList;
            }
        };
    };
    var itr = bubbleSortItrBuilder((1).to(100).shuffle());

    $(document).ready(function(){
        $main_view = $('#main');
        var timer = setInterval(function(){
            $main_view.html(array2view(itr.next()));
            if(!itr.hasNext()){
                clearInterval(timer);
            }
        }, 1);
    });

}(jQuery);
