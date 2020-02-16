var common = {
    init: function(){
        Element.prototype.createChildElement = function(tag, attribute){
            var Child = document.createElement(tag);
            if (attribute)
                attribute.split(',').forEach(function(item){
                    Child.setAttribute(item.split('=')[0], item.split('=')[1]);
                });
            this.appendChild(Child);
            return Child;
        };
        Element.prototype.setResId = function(identifier){
            this.setAttribute("data-l10n-id", identifier);
        };
        Array.prototype.swapDelete = function(index){
            this[index] = this[this.length - 1];
            this.pop();
        }
    }
};
