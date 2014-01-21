function AnimatronicsControllerConstructor()
{
    var _animatronics = {};

    var _mouseenter = function(id)
    {
        // modifica del cursone e dell'azione predefinita
    };

    var _mouseleave = function(id)
    {
        // modifica del cursone e dell'azione predefinita
    };

    var _click = function(id)
    {
        // esegui azione
    };

    var _mousedown = function(id)
    {
        // mostra azioni disponibili
    };

    var _clear = function()
    {
        _animatronics = {};
    };

    var _add = function(id, value)
    {
        var obj = $("#" + id);
        obj.mouseenter(function(){ _mouseenter(id); });
        obj.mouseleave(function(){ _mouseleave(id); });
        obj.click(function(){ _click(id); });

        var timeoutId;
        obj.mousedown(function() { timeoutId = setTimeout(function(){ _mousedown(id); }, 1000);
            }).bind('mouseup mouseleave', function() { clearTimeout(timeoutId); });

        _animatronics[id] = value;
    };

    var _get = function(id)
    {
        return _animatronics[id];
    };

    var _setAnimation = function(id, flowName, beginCallback, endCallback, repeatCount)
    {
        _animatronics[id].setAnimation(flowName, beginCallback, endCallback, repeatCount);
    };

    var _setAnimationLoop = function(id, flowName, beginCallback, endCallback)
    {
        _animatronics[id].setAnimationLoop(flowName, beginCallback, endCallback);
    };

    // ------------------------------------------------

    this.clear = _clear;
    this.add = _add;
    this.get = _get;

    this.setAnimation = _setAnimation;
    this.setAnimationLoop = _setAnimationLoop;
}

var AnimatronicsController = new AnimatronicsControllerConstructor();