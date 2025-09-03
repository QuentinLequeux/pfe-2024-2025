import { toast } from 'sonner';
import { IUser } from '@/types/IUser';
import { BreadcrumbItem } from '@/types';
import { IAnimal } from '@/types/IAnimal';
import { animals } from '../../assets/img';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import Card from '@/components/petshelter/card';
import React, { useEffect, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { FacebookIcon, LinkIcon, MailIcon, Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fiche animal',
        href: '/animals',
    },
];

interface PageProps extends InertiaPageProps {
    access?: string;
    userRole: string;
    user: IUser;
}

const Show: React.FC = () => {
    const { animal } = usePage<{ animal: IAnimal }>().props;
    const { props } = usePage<PageProps>();

    useEffect(() => {
        if (props.access) {
            toast.warning(props.access);
        }
    }, [props.access]);

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = `${window.location.origin}/animals/${animal.slug}`;
        navigator.clipboard.writeText(url).then(() => setCopied(true));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Fiche de ${animal.name}`} />
            <div className={'h-full'}>
                <div className={'h-fit w-full rounded-b-full shadow-md dark:bg-[#1c1e21]'}>
                    <h2 aria-level={2} role={'heading'} className={'py-8 text-center text-3xl font-bold'}>
                        Hello, moi c'est&nbsp;<span className={'text-main'}>{animal.name}</span>
                    </h2>
                </div>
                <div className={'mx-4 mt-8 flex flex-wrap justify-center gap-6'}>
                    <div className={'h-fit rounded-2xl bg-[#fff] p-6 shadow-md max-sm:w-[100%] dark:bg-[#1c1e21]'}>
                        <div className={'flex flex-wrap gap-8'}>
                            <div className={'relative max-h-[300px] w-full min-w-[300px] overflow-hidden rounded-2xl bg-[#eee] lg:w-[60%]'}>
                                {/*<img src={animal.photo?.large ? `/storage${animal.photo.large}` : 'https://fastly.picsum.photos/id/237/400/300.jpg?hmac=32RuLp2fb9I2fzPP3U-6REXQ6sZAbN8ML7_dt3R7wQ8' } alt={`Photo de ${animal.name}`} className={'h-auto w-full'} width={400} height={300} />*/}
                                <img src={animal.photo_url?.large  ?? 'https://fastly.picsum.photos/id/237/400/300.jpg?hmac=32RuLp2fb9I2fzPP3U-6REXQ6sZAbN8ML7_dt3R7wQ8' } alt={`Photo de ${animal.name}`} className={'h-auto w-full'} width={400} height={300} />
                                <div
                                    className={`absolute bottom-0 mt-auto w-full rounded-b-2xl ${
                                        animal.adoption_status === 'En attente'
                                            ? 'bg-main'
                                            : animal.adoption_status === 'Disponible'
                                              ? 'bg-[#A7DE98]'
                                              : animal.adoption_status === 'Adopté'
                                                ? 'bg-[#B74553] text-[#fff]'
                                                : 'bg-[#fff]'
                                    }`}
                                >
                                    <p className={'text-center text-black'}>{animal.adoption_status}</p>
                                </div>
                            </div>
                            <div className={'m-auto max-w-[200px]'}>
                                <p className={'mb-2 rounded-md border dark:border-white/50 py-2 px-4 text-center font-bold'}>
                                    Nom&nbsp;: <span className={'font-light'}>{animal.name}</span>
                                </p>
                                <p className={'mb-2 rounded-md border dark:border-white/50 py-2 px-4 text-center font-bold'}>
                                    Race&nbsp;: <span className={'font-light'}>{animal.breed.breed}</span>
                                </p>
                                <p className={'mb-2 rounded-md border dark:border-white/50 py-2 px-4 text-center font-bold'}>
                                    Sexe&nbsp;: <span className={'font-light'}>{animal.gender}</span>
                                </p>
                                <p className={'mb-2 rounded-md border dark:border-white/50 py-2 px-4 text-center font-bold'}>
                                    Age&nbsp;: <span className={'font-light'}>{animal.age}&nbsp;ans</span>
                                </p>
                                <p className={'mb-2 rounded-md border dark:border-white/50 py-2 px-4 text-center font-bold'}>
                                    Poids&nbsp;: <span className={'font-light'}>{animal.weight}&nbsp;kg</span>
                                </p>
                                <p className={'mb-2 rounded-md border dark:border-white/50 py-2 px-4 text-center font-bold'}>
                                    Parrainages&nbsp;: <span className={'font-light'}>{animal.sponsors_count ?? 0}</span>
                                </p>
                                <p className={'mb-2 rounded-md border dark:border-white/50 py-2 px-4 text-center font-bold'}>
                                    Dons&nbsp;: <span className={'font-light'}>{animal.sponsors_sum_amount ?? 0}&nbsp;€</span>
                                </p>
                            </div>
                        </div>
                        <div className={'w-full sm:w-md md:w-md lg:w-2xl'}>
                            <h3 aria-level={3} role={'heading'} className={'mt-8 mb-4 text-xl font-bold'}>
                                Description&nbsp;:
                            </h3>
                            <p className={'max-w-2xl'}>{animal.description}</p>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-8'}>
                        <div
                            className={
                                'flex h-fit w-[300px] flex-col items-center justify-center gap-2 rounded-2xl bg-[#fff] p-6 shadow-md dark:bg-[#1c1e21] max-md:w-full'
                            }
                        >
                            <p className={'font-bold'}>Lui venir en aide&nbsp;?</p>
                            <Button
                                title={'Parrainer'}
                                disabled={animal.adoption_status === 'Adopté'}
                                className={'bg-main hover:bg-hover font-bold text-black'}
                                onClick={() => router.visit(`/donation?animal=${animal.id}`)}
                            >
                                Parrainer
                            </Button>
                            <div className={'flex gap-2'}>
                                <Button
                                    onClick={handleCopy}
                                    title={'Copier le lien'}
                                    className={'bg-main hover:bg-hover rounded-full text-black mt-2'}
                                >
                                    <p>
                                        {copied ? 'Lien copié' : <LinkIcon/>}
                                    </p>
                                </Button>
                                <Button
                                    title={'Partager par email'}
                                    className={'bg-main hover:bg-hover rounded-full text-black mt-2'}
                                    asChild
                                >
                                    <a href={`mailto:?subject=&body=${window.location.origin}/animal/${animal.slug}`}>
                                        <MailIcon/>
                                    </a>
                                </Button>
                                <Button
                                    title={'Partager via Facebook'}
                                    className={'bg-main hover:bg-hover rounded-full text-black mt-2'}
                                    asChild
                                >
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/animal/${animal.slug}`} role={'link'} target={'_blank'} >
                                        <FacebookIcon/>
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div
                            className={
                                'flex h-fit w-[300px] flex-col items-center justify-center gap-2 rounded-2xl bg-[#fff] p-6 shadow-md dark:bg-[#1c1e21] max-md:w-full'
                            }
                        >
                            <p className={'mb-2 font-bold'}>{animal.organization.name}</p>
                            <p className={'mb-2 text-center'}>{animal.organization.address}</p>
                            <a href={`tel:${animal.organization.phone}`} title={'Appeler ce numéro'} className={'mb-2 underline'}>
                                {animal.organization.phone}
                            </a>
                            <a
                                href={`mailto:${animal.organization.email}?Subject=Informations&body=Bonjour`}
                                title={'Envoyer un email'}
                                className={'mb-2 underline'}
                            >
                                {animal.organization.email}
                            </a>
                            <a href={animal.organization.website} title={'Vers le site web de l\'organisation'} className={'mb-2 underline'} role={'link'} target={'_blank'}>
                                {animal.organization.website}
                            </a>
                            <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
                                <Link href={route('organization.show')} title={'En savoir plus'}>
                                    En savoir plus
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col items-center'}>
                    <h3 aria-level={3} role={'heading'} className={'my-20 text-center text-3xl font-bold max-w-[90%]'}>
                        Eux aussi ont besoin d'aide
                    </h3>
                    <Card />
                </div>
                <div className={'m-auto my-20 flex w-[80%] items-center justify-center'}>
                    <img src={animals} alt={'Image de chien et chat'} loading={'lazy'} className={'h-[300px] w-full rounded-2xl object-cover'} />
                    <Button
                        title={`Parrainer ${animal.name}`}
                        disabled={animal.adoption_status === 'Adopté'}
                        className={'bg-main hover:bg-hover absolute font-bold text-black'}
                        onClick={() => router.visit(`/donation?animal=${animal.id}`)}
                    >
                        Parrainer&nbsp;{animal.name}
                    </Button>
                </div>
                {props.userRole.includes('Administrateur') && props.user.organization_id === animal.organization.id && (
                    <div
                        className={'bg-main hover:scale-115 fixed right-5 bottom-40 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full'}
                        title={'Modifier l\'animal'}
                        onClick={() => router.get(route('animals.edit', animal.id))}
                    >
                        <Pencil color={'#fff'} size={'24px'} />
                    </div>
                )}
                {props.userRole.includes('Administrateur') && props.user.organization_id === animal.organization.id && (
                    <div
                        className={
                            'fixed right-5 bottom-25 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#B74553] hover:scale-115'
                        }
                        onClick={() => {
                            if (confirm('Voulez-vous vraiment supprimer cet animal ?')) router.delete(route('animals.destroy', animal.id));
                        }}
                        title={'Supprimer l\'animal'}
                    >
                        <Trash2 color={'#fff'} size={'24px'} />
                    </div>
                )}
                <div className={'p-2 shadow-fixed sticky bottom-0 flex h-[auto] items-center justify-around rounded-b-2xl max-md:rounded-none bg-[#fff] dark:bg-[#1c1e21]'}>
                    <div className={'flex items-center gap-4'}>
                        <div className={'h-[50px] w-[50px] rounded-full bg-gray-300'}>
                            {/*<img
                                className={'h-full rounded-full'}
                                src={animal.photo?.small ? `/storage${animal.photo.small}` : 'https://fastly.picsum.photos/id/237/50/50.jpg?hmac=9cCVRLgc5HmY_XbEZ4SSgnaR5CqTMUtHPZ04MCvtH-k' }
                                alt={`Photo de ${animal.name}`}
                                width={50}
                                height={50}
                            />*/}
                            <img
                                className={'h-full rounded-full'}
                                src={animal.photo_url?.small ?? 'https://fastly.picsum.photos/id/237/50/50.jpg?hmac=9cCVRLgc5HmY_XbEZ4SSgnaR5CqTMUtHPZ04MCvtH-k' }
                                alt={`Photo de ${animal.name}`}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'max-w-[225px]'}>
                            <p className={'font-bold'}>{animal.name}</p>
                            <p>{animal.breed.breed}</p>
                        </div>
                    </div>
                    <div>
                        <Button
                            title={'Parrainer'}
                            disabled={animal.adoption_status === 'Adopté'}
                            className={'bg-main hover:bg-hover font-bold text-black'}
                            onClick={() => router.visit(`/donation?animal=${animal.id}`)}
                        >
                            Parrainer
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
