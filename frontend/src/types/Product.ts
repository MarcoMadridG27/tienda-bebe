export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
    age?: string;
    gender?: string;
    type?: string;
    availability?: string;
    category?: string;  // 👈 nuevo campo
}
