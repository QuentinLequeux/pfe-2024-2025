import React from 'react';
import { animals } from '../assets/img';
import { BreadcrumbItem } from '@/types';
import { IAnimal } from '@/types/IAnimal';
import AppLayout from '@/layouts/app-layout';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Card from '@/components/petshelter/card';
import { Head, Link, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fiche animal',
        href: '/animals',
    },
];

const Show: React.FC = () => {
    const { animal } = usePage<{ animal: IAnimal }>().props;

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
                    <div className={'h-fit rounded-2xl bg-[#fff] p-6 shadow-md max-sm:w-[90%] dark:bg-[#1c1e21]'}>
                        <div className={'flex flex-wrap gap-8'}>
                            <div className={'relative max-h-[300px] w-full min-w-[300px] overflow-hidden rounded-2xl bg-[#eee] lg:w-[60%]'}>
                                <img src={`/storage/${animal.photo}`} alt={`Photo de ${animal.name}`} className={'h-auto w-full'} loading={'lazy'} />
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
                                    <p className={'text-center'}>{animal.adoption_status}</p>
                                </div>
                            </div>
                            <div className={'m-auto max-w-[200px]'}>
                                <p className={'mb-2 rounded-md border p-2 text-center font-bold'}>
                                    Nom&nbsp;: <span className={'font-light'}>{animal.name}</span>
                                </p>
                                <p className={'mb-2 rounded-md border p-2 text-center font-bold'}>
                                    Race&nbsp;: <span className={'font-light'}>{animal.breed.breed}</span>
                                </p>
                                <p className={'mb-2 rounded-md border p-2 text-center font-bold'}>
                                    Sexe&nbsp;: <span className={'font-light'}>{animal.gender}</span>
                                </p>
                                <p className={'mb-2 rounded-md border p-2 text-center font-bold'}>
                                    Age&nbsp;: <span className={'font-light'}>{animal.age}</span>
                                </p>
                                <p className={'mb-2 rounded-md border p-2 text-center font-bold'}>
                                    Poids&nbsp;: <span className={'font-light'}>{animal.weight}&nbsp;kg</span>
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
                                'flex h-fit w-[300px] flex-col items-center justify-center gap-2 rounded-2xl bg-[#fff] p-6 shadow-md dark:bg-[#1c1e21]'
                            }
                        >
                            <p className={'font-bold'}>Lui venir en aide&nbsp;?</p>
                            <Button
                                disabled={animal.adoption_status === 'Adopté'}
                                className={'bg-main hover:bg-hover font-bold text-black'}
                                onClick={() => router.visit(`/donation?animal=${animal.id}`)}
                            >
                                Parrainer
                            </Button>
                        </div>
                        <div
                            className={
                                'flex h-fit w-[300px] flex-col items-center justify-center gap-2 rounded-2xl bg-[#fff] p-6 shadow-md dark:bg-[#1c1e21]'
                            }
                        >
                            <p className={'mb-2'}>{animal.organization.name}</p>
                            <p className={'mb-2 text-center'}>{animal.organization.address}</p>
                            <a href={`tel:${animal.organization.phone}`} title={'Appeler ce numéro'} className={'mb-2'}>
                                {animal.organization.phone}
                            </a>
                            <a
                                href={`mailto:${animal.organization.email}?Subject=Informations&body=Bonjour`}
                                title={'Envoyer un email'}
                                className={'mb-2'}
                            >
                                {animal.organization.email}
                            </a>
                            <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
                                <Link href={'#'} title={'En savoir plus'}>
                                    En savoir plus
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col items-center'}>
                    <h3 aria-level={3} role={'heading'} className={'my-20 text-center text-3xl font-bold'}>
                        Eux aussi ont besoin d'aide
                    </h3>
                    <Card />
                </div>
                <div className={'m-auto my-20 flex w-[80%] items-center justify-center'}>
                    <img src={animals} alt={'Image de chien et chat'} loading={'lazy'} className={'h-[300px] w-full rounded-2xl object-cover'} />
                    <Button
                        disabled={animal.adoption_status === 'Adopté'}
                        className={'bg-main hover:bg-hover absolute font-bold text-black'}
                        onClick={() => router.visit(`/donation?animal=${animal.id}`)}
                    >
                        Parrainer
                    </Button>
                </div>
                <div
                    className={'bg-main fixed right-5 bottom-40 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full'}
                >
                    <Pencil color={'#fff'} size={'24px'} onClick={() => router.get(route('animals.edit', animal.id))} />
                </div>
                <div
                    className={
                        'fixed right-5 bottom-25 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#B74553]'
                    }
                >
                    <Trash2
                        color={'#fff'}
                        size={'24px'}
                        onClick={() => {
                            if (confirm('Voulez-vous vraiment supprimer cet animal ?')) router.delete(route('animals.destroy', animal.id));
                        }}
                    />
                </div>
                <div className={'shadow-fixed sticky bottom-0 flex h-[70px] items-center justify-around rounded-b-2xl bg-[#fff] dark:bg-[#1c1e21]'}>
                    <div className={'flex items-center gap-4'}>
                        <div className={'h-[50px] w-[50px] rounded-full bg-gray-300'}>
                            <img
                                className={'h-full rounded-full'}
                                src={`/storage/${animal.photo}`}
                                alt={`Photo de ${animal.name}`}
                                loading={'lazy'}
                            />
                        </div>
                        <div>
                            <p className={'font-bold'}>{animal.name}</p>
                            <p>{animal.breed.breed}</p>
                        </div>
                    </div>
                    <div>
                        <Button
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
