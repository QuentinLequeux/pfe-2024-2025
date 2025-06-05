import { IUser } from '@/types/IUser';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type PageProps = {
    user: IUser;
}

export default function Dashboard() {
    const { user } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-6 flex flex-col gap-8">
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
                        {/*<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />*/}
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-6 flex flex-col">
                        <h2 aria-level={2} role={'heading'} className={'font-bold text-xl'}>
                            Animaux parrain&eacute;s
                        </h2>
                        {/*<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />*/}
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
