export interface TransactionCreator {
  create(): any;
  commit(): any;
  abort(): any;
  end(): any;
}