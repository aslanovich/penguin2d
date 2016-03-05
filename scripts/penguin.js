var penguin = {
    x: 0,
    y: 0,

    sprite: [
        /* animate for motion */
        new Sprite(image, 722, 0, 90, 101),
        new Sprite(image, 812, 0, 90, 101),
        new Sprite(image, 908, 0, 90, 101),
        new Sprite(image, 1000, 0, 90, 101),

        /* animate for jump */
        new Sprite(image, 722, 108, 88, 102),
        new Sprite(image, 815, 108, 98, 99),
        new Sprite(image, 917, 108, 98, 99),

        /* animate for hurt */
        new Sprite(image, 1102, 0, 95, 101)
    ],

    frame: 0,
    velocity: 0,
    animationMove: [0, 1, 2, 3],
    animationJump: [4, 5, 6],
    speedAnimationMove: 15,
    speedAnimationJump: 10,

    targetX: 35,
    radius: 25,

    _jump: 11,

    message: '',

    jump: function() {
        this.velocity = -this._jump;
    },

    isJump: function() {
        if (this.y < game.groundLayer) {
            return true;
        }
        return false;
    },

    update: function() {
        this.velocity += game.gravity;
        this.y += this.velocity;

        if (this.isJump()) {
            this.frame += (game.frames % this.speedAnimationJump === 0) ? 1 : 0;
            this.frame %= this.animationJump.length;
        } else {
            this.y = game.groundLayer;
            this.frame += (game.frames % this.speedAnimationMove === 0) ? 1 : 0;
            this.frame %= this.animationMove.length;
        }
    },

    render: function(context) {
        context.save();
        context.translate(this.x, this.y);
        var i;
        if (this.isJump()) {
            i = this.animationJump[this.frame];
            this.sprite[i].draw(context, 60, -45);
        } else {
            i = this.animationMove[this.frame];
            this.sprite[i].draw(context, 60, -45);

        }
        context.restore();
        context.beginPath();
        context.font = '40pt Calibri';
        context.fillStyle = 'blue';
        context.fillText(this.message, 150, 100);
        for (var j = 0; j < 100; j++) {
        }
        context.closePath();
        this.message = '';
        // context.beginPath();
        // context.arc(35, this.y, 25, 0, 2*Math.PI, false);
        // context.lineWidth = 1;
        // context.strokeStyle = 'red';
        // context.stroke();
        // context.closePath();
    }
}
