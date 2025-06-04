export class orderType
{
    id? : number
    name? : string
}

export class Order
{
    id? : number
    name? : string
    productId?: number
    tableId?: number
    qty?: number
    price?: number
    orderDate?: Date
    completionDate?: Date
    orderType? : orderType
}