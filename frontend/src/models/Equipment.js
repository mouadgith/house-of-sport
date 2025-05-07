class Equipment {
  constructor(id, name, icon, total, status, damaged) {
    this.id = id;
    this.name = name;
    this.icon = icon; // string or icon component name
    this.total = total;
    this.status = status; // e.g., 'Disponible'
    this.damaged = damaged; // number
  }
}

export default Equipment;
