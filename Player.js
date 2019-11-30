const width = 300;
const height = 600;
const xvel = 10;
const yvel = 10;
var x = width;
var y = height;
var spdX = xvel;
var spdY = yvel;
class Player {
    contructor() {
        console.log("Made Player");
    }

    createPlayer() {
        var player = function () {

        };

        function updatePosition() {
            switch (key) {
                case 'd':
                    self.x += self.spdX;
                    break;
                case 's':
                    self.y -= self.spdY;
                    break;
                case 'a':
                    self.x -= self.spdX;
                    break;
                case 'w':
                    self.y += self.spdY;
                    break;
                default:
                    break;
            }
        }
        return self;
    }
}

export default Player;