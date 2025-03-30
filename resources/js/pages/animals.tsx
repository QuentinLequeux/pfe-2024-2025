import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Card from '@/components/petshelter/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Animaux',
        href: '/animals',
    },
];

export default function Animals() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Animaux'} />
            <div className={'p-6'}>
                <Card/>
            </div>
        </AppLayout>
    )
}
