import { Database } from "./database";
import { Application } from "./application";

const database = new Database("test-1");
database.connect();

const application = new Application();
application.start();

