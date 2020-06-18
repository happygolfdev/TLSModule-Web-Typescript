"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HGGame = /** @class */ (function () {
    function HGGame(objc) {
        this.type = objc.game_type;
        this.club = objc.game_club;
        this.score = objc.score;
    }
    return HGGame;
}());
exports.HGGame = HGGame;
