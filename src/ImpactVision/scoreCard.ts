/**
 * 스코어 카드 데이터
 */
class ScoreCard {
  roundData?: RoundData;
  holeData: HoleData[];

  constructor(holeData: HoleData[], roundData?: RoundData) {
    this.holeData = holeData;
    this.roundData = roundData;
  }
}

/**
 * 라운드 데이터
 * @param id 라운드의 고유값
 * @param username 사용자의 아이디
 * @param cc 골프장 이름
 * @param numberOfHoles 진행한 전체 홀의 갯수
 * @param parScore 진행한 홀의 기본 파 타수
 * @param myScore 나의 타수
 * @param scoreOffset 기본 타수에서 나의 타수를 뺀 값
 * @param date 플레이한 날짜
 */
class RoundData {
  id: Number;
  username: String;
  cc: String;
  numberOfHoles: Number;
  parScore: Number;
  myScore: Number;
  scoreOffset: Number;
  date: Date;

  constructor(objc: any) {
    this.id = Number(objc.gm_index);
    this.username = objc.gm_id;
    this.cc = objc.gm_cc;
    this.numberOfHoles = Number(objc.gm_hole);
    this.parScore = Number(objc.gm_par);
    this.scoreOffset = Number(objc.gm_score);
    this.myScore = Number(objc.gm_par) + Number(objc.gm_score);
    this.date = new Date(objc.gm_regdate);
  }
}

/**
 * 한 홀의 데이터
 * @param number 홀의 번호
 * @param par 기본 파 타수
 * @param myScore 나의 타수
 * @param putt 나의 퍼트 수
 * @param longDistance 최장타 거리
 * @param longestPutt 최장타 퍼팅 거리
 * @param fairwayOnSuccess 페워웨이 온 성공 여부
 * @param greenOnSuccess 그린 온 성공 여부
 * @param parSuccess 파 성공 여부
 */
class HoleData {
  number: Number;
  par: Number;
  myScore: Number;
  putt: Number;
  longDistance: Number;
  longestPutt: Number;
  fairwayOnSuccess: Boolean;
  greenOnSuccess: Boolean;
  parSuccess: Boolean;

  constructor(objc: any) {
    this.number = Number(objc.hole_no);
    this.par = Number(objc.par);
    this.myScore = Number(objc.score);
    this.putt = Number(objc.putt);
    this.longDistance = Number(objc.long_distance);
    this.longestPutt = Number(objc.longest_putt);
    this.fairwayOnSuccess = objc.on_fairway === "success" ? true : false;
    this.greenOnSuccess = objc.on_green === "success" ? true : false;
    this.parSuccess = objc.par_save === "success" ? true : false;
  }
}

export { ScoreCard, HoleData, RoundData };
