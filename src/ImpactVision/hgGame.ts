class HGGame {
  type: String;
  club: String;
  score: Number;

  constructor(objc: any) {
    this.type = objc.game_type;
    this.club = objc.game_club;
    this.score = objc.score;
  }
}

export { HGGame };
