import { IBreed } from '@/types/IBreed';
import { IOrganization } from '@/types/IOrganization';

export interface IAnimal {
    id: number;
    name: string;
    breed_id: number;
    gender: string;
    age: number;
    weight: number;
    photo: string;
    photo_url: {
        small: string;
        medium: string;
        large: string;
    };
    description: string;
    adoption_status: string;
    arrival_date: string;
    organization: IOrganization;
    breed: IBreed;
    slug: string;
    sponsors_count: number;
}
