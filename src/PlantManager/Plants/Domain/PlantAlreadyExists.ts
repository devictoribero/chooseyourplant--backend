export class PlantAlreadyExists extends Error {
  message: string;

  constructor(id: string) {
    super(`Plant with ID ${id} already exists`);
    this.message = `Plant with ID ${id} already exists`;
  }
}
