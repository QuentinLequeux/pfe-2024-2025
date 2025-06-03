import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { CircleCheckBig } from 'lucide-react';

export default function Success() {
    return (
        <AppLayout>
            <Head title={'Succès'} />
            <div className={'flex flex-col items-center justify-center gap-7 h-full'}>
                <CircleCheckBig color={'#52A13D'} size={100} />
                <p className={'text-3xl font-bold'}>Paiement valid&eacute;&nbsp;!</p>
                <p>Merci pour votre paiement.</p>
                <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
                    <Link href={route('dashboard')} title={"Retourner à l'accueil"}>
                        Retourner &agrave; l'accueil
                    </Link>
                </Button>
            </div>
        </AppLayout>
    );
}
