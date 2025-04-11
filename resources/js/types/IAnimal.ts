export interface IAnimal {
    name: string;
    breed_id: number;
    gender: string;
    age: number;
    weight: number;
    description: string;
    organization: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
}
