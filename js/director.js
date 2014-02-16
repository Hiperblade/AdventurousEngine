function Director(nextStepCallBack)
{
    var _actors = {};

    var _addActor = function(id, data)
    {
        _actors[id] = Actor.create(id, data);
    };

    var _getActor = function(id)
    {
        return _actors[id];
    };
/*
    var _action = function()
    {
        var actor = _actors[0];

        var pos = actor.getPosition();
        actor.setPosition(pos);
    };
*/
    var _nextStep = function()
    {
        for(var id in _actors)
        {
            if(_actors.hasOwnProperty(id))
            {
                _actors[id].nextFrame();
            }
        }

        nextStepCallBack();
    };

    window.setInterval(function(){ _nextStep(); }, Director.StepInterval);

    this.addActor = _addActor;
    this.getActor = _getActor;
}

Director.StepInterval = 100;


function Action(actor, start, duration, destination, animation, nextAnimationLoop)
{

}

function Screenplay()
{

}