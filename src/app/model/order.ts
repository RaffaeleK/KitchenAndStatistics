export class orderType
{
    id? : number
    name? : string
}

abstract class Order
{
    id? : number
    name? : string
    productId?: number
    qty?: number
    price?: number
    orderDate?: Date
    completionDate?: Date
    
}

export class RecivedOrder extends Order
{
    orderType? : orderType
    tableId?: number
}

export class OrderGroup extends RecivedOrder
{
    ids? : number[] = []
    names? : string[] = []
    qtys? : number[] = []
}

export class OrderStats extends Order
{
    image?: string
}