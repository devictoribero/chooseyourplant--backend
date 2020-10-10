export class Plant {
  id: string;
  nickname: string;
  name?: string;

  constructor(id: string, nickname: string, name?: string) {
    this.id = id;
    this.nickname = nickname;
    this.name = name;
  }
}
