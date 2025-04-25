import Card from '@/components/petshelter/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { IAnimal } from '@/types/IAnimal';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const Show: React.FC = () => {
    const { animal } = usePage<{ animal: IAnimal }>().props;

    return (
        <AppLayout>
            <Head title={'Animal'} />
            <div className={'h-full'}>
                <div className={'h-fit w-full rounded-b-full shadow-md'}>
                    <h2 aria-level={2} role={'heading'} className={'py-8 text-center text-3xl font-bold'}>
                        Hello, moi c'est&nbsp;<span className={'text-main'}>{animal.name}</span>
                    </h2>
                </div>
                <div className={'mt-8 flex flex-wrap justify-center gap-6'}>
                    <div className={'h-fit max-w-[90%] rounded-2xl bg-[#fff] p-6 shadow-md'}>
                        <div className={'flex flex-wrap gap-8'}>
                            <div className={'flex h-[300px] sm:w-[60%] w-full flex-col rounded-2xl bg-[#eee]'}>
                                <div
                                    className={`mt-auto w-full justify-end rounded-b-2xl ${
                                        animal.adoption_status === 'En attente'
                                            ? 'bg-orange-500'
                                            : animal.adoption_status === 'Disponible'
                                                ? 'bg-green-500'
                                                : animal.adoption_status === 'Adopté'
                                                    ? 'bg-red-500'
                                                    : 'bg-[#fff]'
                                    }`}
                                >
                                    <p className={'text-center'}>{animal.adoption_status}</p>
                                </div>
                            </div>
                            <div className={'m-auto'}>
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
                        <div>
                            <h3 aria-level={3} role={'heading'} className={'mb-4 mt-8 font-bold text-xl'}>
                                Description&nbsp;:
                            </h3>
                            <p className={'max-w-2xl'}>
                                {animal.description}
                            </p>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-8'}>
                        <div className={'flex flex-col p-6 h-fit w-[300px] items-center justify-center gap-2 rounded-2xl bg-[#fff] shadow-md'}>
                            <p className={'font-bold'}>
                                Lui venir en aide&nbsp;?
                            </p>
                            <Button asChild className={'bg-main hover:bg-hover font-bold'}>
                                <Link href={'#'} title={'Parrainer'}>
                                    Parrainer
                                </Link>
                            </Button>
                        </div>
                        <div className={'h-fit w-[300px] flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#fff] p-6 shadow-md'}>
                            <p className={'mb-2'}>
                                {animal.organization.name}
                            </p>
                            <p className={'text-center mb-2'}>
                                {animal.organization.address}
                            </p>
                            <a href={`tel:${animal.organization.phone}`} title={'Appeler ce numéro'} className={'mb-2'}>
                                {animal.organization.phone}
                            </a>
                            <a href={`mailto:${animal.organization.email}?Subject=Informations&body=Bonjour`} title={'Envoyer un email'} className={'mb-2'}>
                                {animal.organization.email}
                            </a>
                            <Button asChild className={'bg-main hover:bg-hover font-bold'}>
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
                <div className={'m-auto my-20 flex h-[300px] w-[80%] items-center justify-center rounded-2xl bg-[#eee]'}>
                    <Button asChild className={'bg-main hover:bg-hover font-bold'}>
                        <Link href={'#'} title={'Parrainer'}>
                            Parrainer
                        </Link>
                    </Button>
                </div>
                <div className={'fixed z-10 bottom-40 right-5 h-[50px] w-[50px] bg-main rounded-full flex items-center justify-center cursor-pointer'}>
                    <Pencil color={'#fff'} size={'24px'} onClick={() => router.get(route('animals.edit', animal.id))} />
                </div>
                <div className={'fixed z-10 bottom-25 right-5 h-[50px] w-[50px] bg-[#B74553] rounded-full flex items-center justify-center cursor-pointer'}>
                    <Trash2 color={'#fff'} size={'24px'} onClick={() => { if (confirm('Voulez-vous vraiment supprimer cet animal ?'))  router.delete(route('animals.destroy', animal.id)) }} />
                </div>
                <div className={'shadow-fixed sticky bottom-0 flex h-[70px] items-center justify-around rounded-b-2xl bg-[#fff]'}>
                    <div className={'flex gap-4 items-center'}>
                        <div className={'h-[50px] w-[50px] rounded-full bg-gray-300'}></div>
                        <div>
                            <p>{animal.name}</p>
                            <p>{animal.breed.breed}</p>
                        </div>
                    </div>
                    <div>
                        <Button asChild className={'bg-main hover:bg-hover font-bold'}>
                            <Link href={'#'} title={'Parrainer'}>
                                Parrainer
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
