import mongoose from "mongoose";

export class Database {
  protocol: string = "mongodb://";
  host: string = "localhost";
  port: number;
  name: string;
  url: string;

  constructor(name: string, port: number = 27017) {
    this.name = name;
    this.port = port;
    this.url = this.generateUrl();
  }

  generateUrl(): string {
    return `${this.protocol}${this.host}:${this.port}/${this.name}`;
  }

  async connect(): Promise<void> {
    console.log(this.url);
    return mongoose
      .connect(this.url)
      .then(() =>
        console.log(
          `⚡️[database]: has connected successfully to ${this.generateUrl()}`
        )
      )
      .catch(console.error);
  }
}
