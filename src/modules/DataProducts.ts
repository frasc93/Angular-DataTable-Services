export interface DataProducts {
    products: Info[]
    total: number
    skip: number
    limit: number
}
  
export interface Info {
    id?: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}