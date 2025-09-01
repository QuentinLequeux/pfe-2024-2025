import { IBreed } from '@/types/IBreed';
import { IOrganization } from '@/types/IOrganization';

export interface IAnimal {
    id: number;
    name: string;
    breed_id: number;
    gender: string;
    age: number;
    weight: number;
    photo: {
        large: string;
        medium: string;
        small: string;
    } | null;
    photo_url: {
        large: string;
        medium: string;
        small: string;
    } | null;
    description: string;
    adoption_status: string;
    arrival_date: string;
    organization: IOrganization;
    breed: IBreed;
    slug: string;
    sponsors_count: number;
}
