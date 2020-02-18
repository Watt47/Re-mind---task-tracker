var common = {//these are common functions to be shared among other web apps
    init: function(){
        Element.prototype.createChildElement = function(tag, attribute){//creates child with given attributes and returns it
            var Child = document.createElement(tag);
            if (attribute)
                attribute.split(',').forEach(function(item){
                    Child.setAttribute(item.split('=')[0], item.split('=')[1]);
                });
            this.appendChild(Child);
            return Child;
        };
        Element.prototype.setResId = function(identifier){//set localization identifier (html10n.js)
            this.setAttribute("data-l10n-id", identifier);
        };
        Array.prototype.swapDelete = function(index){//speed-up deleting, internet says it is faster than splice
            this[index] = this[this.length - 1];
            this.pop();
        }
    }
};
