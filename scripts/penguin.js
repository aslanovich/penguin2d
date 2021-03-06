/**
* Объект "Пингвин".
*
* Содержит описание и поведение Пингвина в игре.
*
* @constructor
*/
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
        new Sprite(image, 1091, 0, 95, 100),

        /* animate for god mode */
        new Sprite(image, 723, 325, 105, 96),
        new Sprite(image, 841, 344, 120, 79),

        /* animate for fallen */
        new Sprite(image, 722, 218, 88, 100),
        new Sprite(image, 815, 217, 89, 101),
        new Sprite(image, 909, 218, 99, 101),
        new Sprite(image, 1011, 216, 101, 89)
    ],

    frame: 0,
    velocity: 0,
    animationMove: [0, 1, 2, 3],
    animationJump: [4, 5, 6],
    animationHurt: [7, 7],
    animationGodMode: [8, 9, 9, 9],
    animationDeath: [10, 11, 12, 13],
    speedAnimationMove: 15,
    speedAnimationJump: 10,
    speedAnimationHurt: 10,
    speedAnimationGodMode: 10,
    speedAnimationDeath: 15,
    isHurt: false,
    isGodMode: false,
    isDie: false,
    isFell: false,

    hurtFrame: 0,
    godModeFrame: 0,
    deathFrame: 0,

    targetX: 100,
    targetY: 10,
    radius: 40,

    _jump: 11,

    /**
    * Перемещает Пингвина по вертикали вверх.
    *
    */
    jump: function() {
        this.velocity = -this._jump;
    },

    /**
    * Проверяет находится ли Пингвин в прыжке.
    * 
    * return {boolean} true - Пингвин прыгнул; false - иначе.
    */
    isJump: function() {
        if (this.y < game.groundLayer) {
            return true;
        }
        return false;
    },

    /**
    * Проверяет есть ли пересечение объекта Пингвин с другими объектами.
    * @param {number} envX - положение объекта по оси X.
    * @param {number} envY - положение объекта по оси Y.
    * @param {number} envRadius - радиус объекта.
    *
    * @return {boolean} true - есть пересечение; false - иначе.
    */
    isHit: function(envX, envY, envRadius) {
        var x = (this.targetX - envX) * (this.targetX - envX);
        var y = (this.y + this.targetY - envY) * (this.y + this.targetY - envY);
        var r = (envRadius + this.radius) * (envRadius + this.radius);

        if (x + y <= r) {
            return true;
        }
        return false;
    },

    /**
    * Обновляет положение объекта "Пингвин" в игре.
    *
    */
    update: function() {
        this.velocity += game.gravity;
        this.y += this.velocity;

        if (this.isHurt) {
            game.speed = 0;
            if (!this.isJump()) { 
                this.y = game.groundLayer;
            }
            this.frame += (game.frames % this.speedAnimationHurt === 0) ? 1 : 0;
            this.frame %= this.animationHurt.length;
        } else if (this.isFell) { 

        } else if (this.isGodMode) {
            game.speed = 10;
            if (!this.isJump()) {
                this.y = game.groundLayer;
            }
            this.frame += (game.frames % this.speedAnimationGodMode === 0) ? 1 : 0;
            this.frame %= this.animationGodMode.length;
        } else if (this.isJump()) {
            this.frame += (game.frames % this.speedAnimationJump === 0) ? 1 : 0;
            this.frame %= this.animationJump.length;
        } else if (this.isDie) {
            this.y = game.groundLayer;
            this.frame += (game.frames % this.speedAnimationDeath === 0) ? 1 : 0;
            this.frame %= this.animationDeath.length;
        } else {
            this.y = game.groundLayer;
            this.frame += (game.frames % this.speedAnimationMove === 0) ? 1 : 0;
            this.frame %= this.animationMove.length;
        }
    },

    /**
    * Отрисовывает объект "Сугроб" в игре.
    *
    * @param {CanvasRenderingContext2D} context место для рисования.
    */
    render: function(context) {
        context.save();
        context.translate(this.x, this.y);
        var i;
        if (this.isHurt) {
            if (this.hurtFrame === 10) {
                this.hurtFrame = 0;
                this.isHurt = false;
                game.speed = 3.8;
            }
            this.hurtFrame++;
            i = this.animationHurt[this.frame];
            this.sprite[i].draw(context, 60, -45);
        } else if (this.isFell) { 
            
        } else if (this.isGodMode) {
            if (this.godModeFrame === 600) {
                this.godModeFrame = 0;
                game.speed = 3.8;
                this.isGodMode = false;
            }
            this.godModeFrame++;
            i = this.animationGodMode[this.frame];
            this.sprite[i].draw(context, 60, -45);
        } else if (this.isJump()) {
            i = this.animationJump[this.frame];
            this.sprite[i].draw(context, 60, -45);
        } else if (this.isDie) {
            if (this.deathFrame === 30) {
                this.deathFrame = 0;
                game.currentState = state.GAME_OVER;
            }
            this.deathFrame++;
            i = this.animationDeath[this.frame];
            this.sprite[i].draw(context, 60, -45);
        } else {
            i = this.animationMove[this.frame];
            this.sprite[i].draw(context, 60, -45);

        }
        context.restore();

        // context.beginPath();
        // context.arc(this.targetX, this.y + this.targetY, this.radius, 0, 2*Math.PI, false);
        // context.lineWidth = 1;
        // context.strokeStyle = 'red';
        // context.stroke();
        // context.closePath();
    }
}
