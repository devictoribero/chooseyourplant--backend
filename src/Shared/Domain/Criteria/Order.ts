enum ORDER_DIRECTION {
  ASC = 'ASC',
  DESC = 'DESC'
}

export class Order {
  private orderDirection: ORDER_DIRECTION 

  constructor(orderDirection: ORDER_DIRECTION) {
    this.orderDirection = orderDirection
  }

  public getOrderDirection(): ORDER_DIRECTION {
    return this.orderDirection;
  }
}