export interface ITransaction {
    id: number;
    animal: {
        id: number;
        name: string;
    };
    organization: {
      id: number;
      name: string;
    };
    stripe_id: string;
    amount: number;
    currency: string;
    status: string;
    method: string;
    user_id: number;
    animal_id: number;
    organization_id: number;
    created_at: string;
    updated_at: string;
}
