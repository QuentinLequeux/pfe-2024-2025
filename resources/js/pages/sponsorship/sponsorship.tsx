import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import Card from '@/components/petshelter/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Parrainage',
        href: '/sponsorship',
    },
];

export default function Sponsorship() {

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Parrainage'} />
            <div className={'p-6 h-full'}>
                <Card/>
            </div>
        </AppLayout>
    )
}
