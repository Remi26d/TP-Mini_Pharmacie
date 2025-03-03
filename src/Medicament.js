export default class Medicament {
  constructor(id, denomination, forme, photo, qte) {
    this._id = id;
    this._denomination = denomination;
    this._forme = forme;
    this._photo = photo;
    this._qte = qte;
  }

  get id() {
    return this._id;
  }

  get denomination() {
    return this._denomination;
  }

  get forme() {
    return this._forme;
  }

  get photo() {
    return this._photo
      ? `https://apipharmacie.pecatte.fr/images/${this._photo}`
      : "";
  }

  get qte() {
    return this._qte;
  }

  set denomination(value) {
    this._denomination = value;
  }

  set forme(value) {
    this._forme = value;
  }

  set photo(value) {
    this._photo = value;
  }

  set qte(value) {
    this._qte = value;
  }

  ajouterUn() {
    this._qte += 1;
  }

  retirerUn() {
    if (this._qte > 0) this._qte -= 1;
  }
}
