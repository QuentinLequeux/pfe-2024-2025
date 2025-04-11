import { IBreed } from '@/types/IBreed';
import { IOrganization } from '@/types/IOrganization';

export interface IAnimal {
    id: number;
    name: string;
    breed_id: number;
    gender: string;
    age: number;
    weight: number;
    description: string;
    adoption_status: string;
    organization: IOrganization
    breed: IBreed
}
