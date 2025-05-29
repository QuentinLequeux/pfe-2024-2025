import Card from '@/components/petshelter/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Animaux',
        href: '/animals',
    },
];

interface PageProps extends InertiaPageProps {
    success?: string;
}

const Animals = () => {
    const { props } = usePage<PageProps>();

    useEffect(() => {
        if (props.success) {
            toast.success(props.success);
        }
    }, [props.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* TODO : Màj du HEAD */}
            <Head title={'Animaux'} />
            <Button asChild className={'bg-main hover:bg-hover ml-auto font-bold'}>
                <Link href={'/animals/create'} title={'Ajouter un animal'}>
                    Ajouter un animal
                </Link>
            </Button>
            <div className={'p-6 h-full'}>
                <Card />
            </div>
        </AppLayout>
    );
};

export default Animals;
