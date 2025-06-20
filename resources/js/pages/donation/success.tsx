import { BreadcrumbItem } from '@/types';
import ReactConfetti from 'react-confetti';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWindowSize } from '@react-hook/window-size';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Paiement validé',
        href: '#',
    }
];

export default function Success() {
    const [showConfetti, setShowConfetti] = useState(true);
    const [width, height] = useWindowSize();

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Paiement validé'} />
            {showConfetti && (
                <ReactConfetti
                    width={width}
                    height={height}
                    numberOfPieces={700}
                    gravity={0.1}
                    colors={['#E8A87C']}
                    recycle={false}
                    onConfettiComplete={() => {
                        setShowConfetti(false);
                    }}
                />
            )}
            <div className={'flex h-full flex-col items-center justify-center gap-7'}>
                <CircleCheckBig color={'#52A13D'} size={100} />
                <p className={'text-3xl font-bold'}>Paiement valid&eacute;&nbsp;!</p>
                <p>Merci pour votre paiement&nbsp;!</p>
                <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
                    <Link href={route('dashboard')} title={"Retourner à l'accueil"}>
                        Retourner &agrave; l'accueil
                    </Link>
                </Button>
            </div>
        </AppLayout>
    );
}
