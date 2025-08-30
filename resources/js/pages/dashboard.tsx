import { IUser } from '@/types/IUser';
import { PartyPopper } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type PageProps = {
    user: IUser;
    sponsoredAnimals: number;
}

export default function Dashboard() {
    const { user, sponsoredAnimals } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-wrap gap-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-6 flex flex-col gap-8 max-md:w-full">
                        <h2 aria-level={2} role={"heading"} className={'font-bold text-xl'}>
                            Bienvenue sur <span className={'text-main'}>PetShelter</span>, {user.name}&nbsp;!
                        </h2>
                        <p className={'text-sm'}>
                            Utilise le bouton ci-dessous pour d&eacute;couvrir les animaux &agrave; parrainer.
                        </p>
                        <Button asChild className={'bg-main hover:bg-hover text-black font-bold w-fit'}>
                            <Link title={'Découvrir les animaux'} href={route('animals')}>
                                D&eacute;couvrir les animaux
                            </Link>
                        </Button>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-6 flex flex-col gap-4 w-[471px] max-md:w-full max-md:min-w-[100%]">
                        <h2 aria-level={2} role={'heading'} className={'font-bold text-xl'}>
                            Animaux parrain&eacute;s
                        </h2>
                        <div className={'text-2xl font-bold text-main flex gap-2'}>
                            {sponsoredAnimals}<PartyPopper className={'inline'}/>
                        </div>
                        <p className={'text-sm'}>
                            Merci pour votre soutien&nbsp;!
                        </p>
                        <Button asChild className={'bg-main hover:bg-hover font-bold text-black w-fit'}>
                            <Link title={'Parrainage'} href={'/sponsorship'}>
                                Parrainage
                            </Link>
                        </Button>
                    </div>
                    <div className={'border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-6 flex flex-col gap-4 w-[471px] max-md:w-full max-md:min-w-[100%'}>
                        <h2 aria-level={2} role={'heading'} className={'font-bold text-xl'}>
                            D&eacute;couvrez les refuges
                        </h2>
                        <p className={'text-sm'}>
                            Parcourez les refuges partenaires&nbsp;!
                        </p>
                        <Button asChild className={'bg-main hover:bg-hover font-bold text-black w-fit'}>
                            <Link title={'Découvrir les refuges'} href={route('organization.show')}>
                                D&eacute;couvrir les refuges
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
