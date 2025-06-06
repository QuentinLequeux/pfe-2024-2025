import { toast } from 'sonner';
import { useEffect } from 'react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Refuges',
        href: '/organizations',
    }
];

interface PageProps extends InertiaPageProps {
    success?: string;
}

export default function Organizations() {
    const { props } = usePage<PageProps>();

    useEffect(() => {
        if (props.success) {
            toast.success(props.success);
        }
    }, [props.success]);

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Refuges'} />
            <div className={'p-6 w-full flex justify-end gap-2'}>
                <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
                    <Link href={route('organization.admin')} >
                        Associer un membre
                    </Link>
                </Button>
                <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
                    <Link href={route('organization.create')} >
                        Cr&eacute;er une organisation
                    </Link>
                </Button>
            </div>
        </AppLayout>
    );
}
