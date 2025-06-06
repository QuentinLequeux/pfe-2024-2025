import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Créer une organisation',
        href: '/organization/create',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Créer une organisation'} />
            <div className={'p-6'}>En cours...</div>
        </AppLayout>
    );
}
