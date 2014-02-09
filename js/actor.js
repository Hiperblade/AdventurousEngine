function Actor(canvasId, frameWidth, frameHeight, spriteImage, animations, loadCallback)
{
    var _canvas;
    var _context;
    var _image;
    var _framePerRow = 0;
    var _width;
    var _height;
    var _animations = animations;

    var _currentAnimation = null;
    var _nextAnimation = null;
    var _currentFrame = 0;
    var _repeatCount = -1;
    var _beginCallback = null;
    var _endCallback = null;

    var _initialize = function(canvasId, frameWidth, frameHeight, spriteImage, loadCallback)
    {
        _width = frameWidth;
        _height = frameHeight;

        _canvas = $("#" + canvasId);
        _canvas[0].width = _width;
        _canvas[0].height = _height;
        _context = _canvas[0].getContext('2d');

        // load image
        var image = $('<img src="'+ spriteImage +'" style="display:none;">');
        image.load(function()
        {
            _framePerRow = Math.floor(this.width / _width);
            if(loadCallback)
            {
                loadCallback();
            }
        });
        _image = image[0]; // get the html tag
    };

    var _setFrame = function(frame)
    {
        var x = frame % _framePerRow;
        var y = Math.floor(frame / _framePerRow);
        _context.clearRect(0, 0, _width, _height);
        _context.drawImage(_image, x * _width, y * _height, _width, _height, 0, 0, _width, _height);
    };

    var _nextFrame = function()
    {
        if(_currentAnimation)
        {
            if(_currentFrame == 0)
            {
                if(_beginCallback != null)
                {
                    _beginCallback(this);
                }
            }

            _setFrame(_animations[_currentAnimation][_currentFrame]);
            _currentFrame++;

            if(_currentFrame >= _animations[_currentAnimation].length)
            {
                _currentFrame = 0;
                // animazione terminata
                if(_repeatCount == -1)
                {
                    // loop
                    if(_nextAnimation)
                    {
                        _currentAnimation = null;

                        if(_endCallback != null)
                        {
                            _endCallback(this);
                        }

                        _startAnimation(_nextAnimation.name, _nextAnimation.beginCallback, _nextAnimation.endCallback, _nextAnimation.repeatCount);
                        _nextAnimation = null;
                    }
                }
                else
                {
                    _repeatCount--;
                    if(_repeatCount <= 0)
                    {
                        _currentAnimation = null;

                        if(_endCallback != null)
                        {
                            _endCallback(this);
                        }

                        if(_nextAnimation)
                        {
                            _startAnimation(_nextAnimation.name, _nextAnimation.beginCallback, _nextAnimation.endCallback, _nextAnimation.repeatCount);
                            _nextAnimation = null;
                        }
                    }
                }
            }
        }
    };

    var _getPosition = function()
    {
        var tmp = _canvas.position();
        return { x: tmp.left, y: tmp.top };
    };

    var _setPosition = function(x, y)
    {
        _canvas.css('left', x + 'px');
        _canvas.css('top', y + 'px');
    };

    var _setNextAnimationLoop = function (name, beginCallback, endCallback)
    {
        _setNextAnimation(name, beginCallback, endCallback, -1);
    };

    var _setNextAnimation = function (name, beginCallback, endCallback, repeatCount)
    {
        if(repeatCount == null)
        {
            repeatCount = 1;
        }

        if(_currentAnimation == null)
        {
            _startAnimation(name, beginCallback, endCallback, repeatCount);
        }
        else
        {
            _nextAnimation = {"name": name, "beginCallback": beginCallback, "endCallback": endCallback, "repeatCount": repeatCount};
        }
    };

    var _setAnimationLoop = function (name, beginCallback, endCallback)
    {
        _setAnimation(name, beginCallback, endCallback, -1);
    };

    var _setAnimation = function (name, beginCallback, endCallback, repeatCount)
    {
        if(repeatCount == null)
        {
            repeatCount = 1;
        }

        //TODO: lanciare l'evento di fine animazione precedente anche se non è stata completata?

        _nextAnimation = null;

        _startAnimation(name, beginCallback, endCallback, repeatCount);
    };

    var _startAnimation = function(name, beginCallback, endCallback, repeatCount)
    {
        _beginCallback = beginCallback;
        _endCallback = endCallback;
        _repeatCount = repeatCount;
        _currentFrame = 0;
        _currentAnimation = name;
    };

    /* *************************************** */

    this.nextFrame = _nextFrame;
    this.getPosition = _getPosition;
    this.setPosition = _setPosition;

    this.setNextAnimation = _setNextAnimation;
    this.setNextAnimationLoop = _setNextAnimationLoop;
    this.setAnimation = _setAnimation;
    this.setAnimationLoop = _setAnimationLoop;

    /* *************************************** */

    _initialize(canvasId, frameWidth, frameHeight, spriteImage, loadCallback);
}

Actor.create = function(canvasId, data)
{
    return new Actor(canvasId, data.width, data.height, data.sprite, data.animations, data.loadCallback);
}
