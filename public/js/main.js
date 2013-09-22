!function($, undefined){
    "use strict";
    
    var $main_view;
    var $bubble_sort_btn;
    var $selection_sort_btn;
    
    var array2view = function(list){
        return list.map(function(v){
            return Array.apply(null, Array(v)).map(function(){return '*'}).join('');
        }).join('<br />');
    };

    var selectionSortItrBuilder = function(list) {
        var myList = list.concat();
        var i = 0, minpos = i, j = 1;
        return {
            hasNext : function(){
                return i < myList.length - 1;
            },
            next : function(){
                if (myList[minpos] > myList[j]) {
		            minpos = j;
		        }
                j++;
                if(j >= myList.length){
                    myList.swap(i, minpos);
                    i++;
                    j= i + 1;
                    minpos = i;
                }
                return myList;
            }
        };
    };
    
    var bubbleSortItrBuilder = function(list){
        var myList = list.concat();
        var i = 0, j = myList.length - 1;
        return {
            hasNext : function(){
                return i < myList.length-1;
            },
            next : function(){
                if(myList[j] < myList[j-1]){
                    myList.swap(j, j-1);
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
    
    $(document).ready(function(){
        var timer;
        var itr;
        var start = function(){
            clearInterval(timer);
            timer = setInterval(function(){
                $main_view.html(array2view(itr.next()));
                if(!itr.hasNext()){
                    clearInterval(timer);
                }
            }, 1);
        };
        
        $main_view = $('div#main');
        $bubble_sort_btn = $('button#bubble-sort');
        $selection_sort_btn = $('button#selection-sort');
        
        $bubble_sort_btn.on('click', function(event){
            itr = bubbleSortItrBuilder((1).to(100).shuffle());
            start();
        });
        $selection_sort_btn.on('click', function(event){
            itr = selectionSortItrBuilder((1).to(100).shuffle());
            start();
        });
        
    });

}(jQuery);
