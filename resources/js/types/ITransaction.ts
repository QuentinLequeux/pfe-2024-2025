export interface ITransaction {
    id: number;
    stripe_id: string;
    amount: number;
    currency: string;
    status: string;
    method: string;
    user_id: number;
    animal_id: number;
    organization_id: number;
}
