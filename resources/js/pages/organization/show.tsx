import { toast } from 'sonner';
import { useEffect } from 'react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { IOrganization } from '@/types/IOrganization';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AtSign, Building, Landmark, Mail, Phone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Refuges',
        href: '/organizations',
    }
];

interface PageProps extends InertiaPageProps {
    success?: string;
    organizations: IOrganization[];
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
                        Associer un utilisateur
                    </Link>
                </Button>
                <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
                    <Link href={route('organization.create')} >
                        Cr&eacute;er une organisation
                    </Link>
                </Button>
            </div>
            <div className={'w-full flex flex-wrap gap-4 justify-center my-4'}>
                {props.organizations.length === 0 && <p>Aucune organisation</p>}
                {props.organizations.map(organization => (
                    <div key={organization.id} className={'border rounded-2xl p-6 flex flex-col gap-4 w-[30%] min-w-[400px] shadow-md'}>
                        <p className={'font-bold'}>{organization.name}</p>
                        <p><Building className={'inline mr-2'}/>{organization.address}</p>
                        <a className={'underline'} href={`tel:${organization.phone}`} title={'Appeler ce numéro'}><Phone className={'inline mr-2'}/>{organization.phone}</a>
                        <a className={'underline'} href={`mailto:${organization.email}`} title={'Envoyer un email'}><Mail className={'inline mr-2'}/>{organization.email}</a>
                        <a className={'underline'} href={organization.website} title={`Vers ${organization.website}`} target={'_blank'}><AtSign className={'inline mr-2'}/>{organization.website}</a>
                        <p><Landmark className={'inline mr-2'}/>{organization.iban}</p>
                        <Button asChild className={'bg-main hover:bg-hover font-bold text-black w-fit m-auto'}>
                            <Link href={'#'}>
                                Voir les animaux
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}

// TODO : Voir les animaux du refuge.
