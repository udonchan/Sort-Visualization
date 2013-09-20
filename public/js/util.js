delete $;

Object.defineProperty(
    Array.prototype, "sample", {
        value : function(num){
            num = num === undefined ? 1 : num;
            if(num === 1){
                return this[this.length - 1];
            }
            var _this = this;
            var random_iter = (function(){
                var ary = Array.apply(null, Array(_this.length)).map(function(v, c){return c});
                return {
                    has_next: function(){
                        return ary.length > 0;
                    },
                    next: function(){
                        if(!this.has_next()) {
                            return null;
                        }
                        return _this[ary.splice(Math.floor(Math.random() * ary.length),1)];
                    }
                }
            })();
            return Array.apply(null, Array(num)).map(function(){
                return random_iter.next();
            });
        },
        writable : true,
        configurable : true,
        enumerable : false
    });

Object.defineProperty(
    Array.prototype, "shuffle", {
        value: function(){
            return this.sample(this.length);
        },
        writable : true,
        configurable : true,
        enumerable : false
    });

Number.prototype.to = function(to){
    if(arguments.length < 1 || this != parseInt(this) || to != parseInt(to) || this > to){
        return [this];
    }
    return Array.apply(null, Array(to-this+1)).map(function(v,c){
        return this+c;
    }.bind(this));
};
