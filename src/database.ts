import mongoose from "mongoose";

export class Database {
  protocol: string = "mongodb://";
  host: string = "localhost";
  port: number;
  name: string;
  url: string;
  options: any;

  constructor(name: string, port: number = 27017) {
    this.name = name;
    this.port = port;
    this.url = this.generateUrl();
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }

  generateUrl(): string {
    // Needed to use trasactions.
    const querystrings = 'replicaSet=rs'

    return `${this.protocol}${this.host}:${this.port}/${this.name}?${querystrings}`;
  }

  async connect(): Promise<void> {
    return mongoose
      .connect(this.url, this.options)
      .then(() =>
        console.log(
          `⚡️[database]: has connected successfully to ${this.generateUrl()}`
        )
      )
      .catch(console.error);
  }
}
