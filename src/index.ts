import { Database } from "./database";
import { Application } from "./application";

const database = new Database("chooseyourplant-dev");
database.connect();

const application = new Application();
application.start();

