function AnimatronicConstructor(mainElementId, flows)
{
    var _flows = flows;
    var _currentFlow = null;
    var _step = -1;
    var _repeatCount = -1;
    var _beginCallback;
    var _endCallback;
    var _nextFlow = null;

    AnimatronicsController.add(mainElementId, this);

    var _animationStep = function ()
    {
        _step = _step + 1;
        if(_step == _flows[_currentFlow].length)
        {
            _step = 0;

            if(_repeatCount != -1)
            {
                _repeatCount = _repeatCount - 1;
                if(_repeatCount == 0)
                {
                    _currentFlow = null;
                    if(!_startNextAnimation())
                    {
                        // lancio evento di fine animazione
                        if(_endCallback != null)
                        {
                            _endCallback(this);
                        }
                        return;
                    }
                }
            }
            else  // sei in un loop (quindi interrompibile)
            {
                _startNextAnimation();
            }
        }

        $("#" + _flows[_currentFlow][_step])[0].beginElement();

        if((_step == 0) && (_beginCallback != null))
        {
            _beginCallback(this);
        }
    };

    var _startNextAnimation = function()
    {
        if(_nextFlow != null)
        {
            // lancio evento di fine animazione
            if(_endCallback != null)
            {
                _endCallback(this);
            }

            var tmp = _nextFlow;
            _nextFlow = null;
            _startAnimation(tmp.flowName, tmp.beginCallback, tmp.endCallback, tmp.repeatCount);
            return true;
        }
        return false;
    };

    var _startAnimation = function (flowName, beginCallback, endCallback, repeatCount)
    {
        _repeatCount = repeatCount;
        _currentFlow = flowName;
        _step = -1;
        _beginCallback = beginCallback;
        _endCallback = endCallback;

        _animationStep();
    };

    var _setAnimationLoop = function (flowName, beginCallback, endCallback)
    {
        _setAnimation(flowName, beginCallback, endCallback, -1);
    };

    var _setAnimation = function (flowName, beginCallback, endCallback, repeatCount)
    {
        if(repeatCount == null)
        {
            repeatCount = 1;
        }

        if(_currentFlow == null)
        {
            _startAnimation(flowName, beginCallback, endCallback, repeatCount);
        }
        else
        {
            _nextFlow = {"flowName": flowName, "beginCallback": beginCallback, "endCallback": endCallback, "repeatCount": repeatCount};
        }
    };

    var _resetCurrentFlow = function()
    {
        _currentFlow = null;

        // lancio evento di fine animazione
        if(_endCallback != null)
        {
            _endCallback(this);
        }
    };

	var _getCurrentAnimation = function()
	{
		return _flows[_currentFlow][_step];
	};

    // ------------------------------------------------

    this.onEnd = _animationStep;
    this.onBeginStatic = _resetCurrentFlow;
    this.setAnimation = _setAnimation;
    this.setAnimationLoop = _setAnimationLoop;
	this.getCurrentAnimation = _getCurrentAnimation;
}
