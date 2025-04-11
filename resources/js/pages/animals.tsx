import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Card from '@/components/petshelter/card';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Animaux',
        href: '/animals',
    },
];

const Animals = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* TODO : Màj du HEAD */}
            <Head title={'Animaux'} />
            <Button asChild className={'ml-auto bg-main hover:bg-hover font-bold'}>
                <Link href={'/animals/create'} title={'Ajouter un animal'}>
                    Ajouter un animal
                </Link>
            </Button>
            <div className={'p-6'}>
                <Card/>
            </div>
        </AppLayout>
    )
}

export default Animals;
