const OFFSET_DETAULT = 0
const LIMIT_DETAULT = 20

export class Criteria {
  private limit: number 
  private offset: number 

  constructor(
    offset: number = OFFSET_DETAULT,
    limit: number = LIMIT_DETAULT
  ) {
    this.limit = limit;
    this.offset = offset;
  }

  public getLimit(): number {
    return this.limit;
  }

  public getOffset(): number {
    return this.offset;
  }
}