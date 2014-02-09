function Director(moveActor)
{
    var _actors = [];

    var _addActor = function(actor)
    {
        _actors.push(actor);
    };

    var _nextStep = function()
    {
        for(var i in _actors)
        {
            _actors[i].nextFrame();

            moveActor(_actors[i]);
        }
    };

    window.setInterval(function(){ _nextStep(); }, 100);

    this.addActor = _addActor;
}
