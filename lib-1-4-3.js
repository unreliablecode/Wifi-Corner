function g(id){
        return document.getElementById(id);
}
function addHover(el){
        if (el)
                $(el).addClass("hover");
}
function removeHover(el){
        if (el)
                $(el).removeClass("hover");
}
var _timers = [];
var _act_elements = [];
var _timeout = 100; //can change this setting to hide items slowly or faster

function onItem(el, menu, test_parents, rem_func, add_func){
        if (!menu) menu='';
        var $el = $(el);
        if ($el.hasClass('invis')){
                return false;
        }
        if (_timers[menu])
                clearTimeout(_timers[menu]);
        if (_act_elements[menu] && $el.attr('id') != _act_elements[menu].getAttribute('id') && (!test_parents || !$el.parents("li").is('#'+_act_elements[menu].getAttribute('id')))){
                if (!rem_func) removeHover(_act_elements[menu]);
                else rem_func(_act_elements[menu]);
        }
        if (!add_func && !$el.hasClass('hover')) {
                $el.addClass('hover');
        }
        else if (add_func) {
                add_func(el);
        }
        _act_elements[menu] = el;
}

function outItem(el, menu, tfunc){
        if (!menu) menu='';
        var $el = $(el);
        if ($el.hasClass('invis')){
                return false;
        }
        if (_timers[menu])
                clearTimeout(_timers[menu]);
        if (!tfunc)
                tfunc = function($e){return function(){$e.removeClass('hover');}}($el);
        _timers[menu] = setTimeout(tfunc, _timeout);
}
