import { toast } from 'sonner';
import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import Card from '@/components/petshelter/card';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

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
            <Head title={'Animaux'} />
            <div className={'p-6 h-full flex flex-col'}>
                <Button asChild className={'bg-main hover:bg-hover text-black ml-auto font-bold mb-4'}>
                    <Link href={'/animals/create'} title={'Ajouter un animal'}>
                        Ajouter un animal
                    </Link>
                </Button>
                <Card />
            </div>
        </AppLayout>
    );
};

export default Animals;
