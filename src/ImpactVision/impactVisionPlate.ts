class ImpactVisionPlate {
  id: Number;
  shopID: String;
  lockKey: String;
  name: String;
  registeredAt: Date;

  constructor(id: Number, object: any) {
    this.id = id;
    this.shopID = object.client_shop_id;
    this.lockKey = object.client_lock_key;
    this.name = object.client_nick;
    this.registeredAt = new Date(object.client_regdate);
  }
}

export { ImpactVisionPlate };
