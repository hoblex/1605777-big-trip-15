export default class Offers {
  constructor() {
    this.offersList = new Map();
  }

  setOffers(offersList) {
    this.offersList = new Map(offersList);
  }

  getOffers() {
    return this.offersList;
  }
}
