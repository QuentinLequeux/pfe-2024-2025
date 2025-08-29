import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/components/petshelter/card';
import { Button } from '@/components/ui/button';

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
            <div className={'p-6 w-full flex justify-end'}>
                <Button title={'Historique des dons'} className={'bg-main hover:bg-hover text-black font-bold'} asChild>
                    <Link href={route('history')}>
                        Historique des dons
                    </Link>
                </Button>
            </div>
            <div className={'p-6'}>
                <Card/>
            </div>
        </AppLayout>
    )
}
