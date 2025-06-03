export class orderType
{
    id? : number
    name? : string
}

export class Order extends orderType
{
    productId?: number
    tableId?: number
    qty?: number
    price?: number
    orderDate?: Date
    completionDate?: Date
    orderType? : orderType
}