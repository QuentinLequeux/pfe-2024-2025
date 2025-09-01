import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import Card from '@/components/petshelter/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Animaux',
        href: '#',
    }
];

export default function byOrganization({ organization }: { organization: { name: string } })
{
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Animaux - ${organization.name}`} />
            <div className={'p-6'}>
                <h2 aria-level={2} role={'heading'} className={'font-bold text-2xl mb-8'}>
                    Animaux - {organization.name}
                </h2>
                <Card/>
            </div>
        </AppLayout>
    );
}

// TODO : Recherche + Filtres + Tri
