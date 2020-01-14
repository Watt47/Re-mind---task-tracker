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
    }
};
