import { TransactionCreator } from "../Domain/TransactionCreator";
import mongoose from "mongoose";
import { Database } from "src/database";

export class MongoTransactionCreator implements TransactionCreator {
  database: Database
  constructor(database: Database) {
    this.database = database
  }

  async create() {
    return mongoose.startSession()
  }
  
  async commit() {
  }

  async abort() {
  }

  async end() {
  }
}