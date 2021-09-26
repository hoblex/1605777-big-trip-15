export default class Descriptions {
  constructor() {
    this.descriptionsList = new Map();
  }

  setDescriptions(descriptionList) {
    this.descriptionsList = descriptionList;
  }

  getDescriptions() {
    return this.descriptionsList;
  }
}
