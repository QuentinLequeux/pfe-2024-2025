import React from 'react';
import { Ban } from 'lucide-react';
import { IAnimal } from '@/types/IAnimal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';

interface IPaginateResults<T> {
    data: T;
    links: {
        label: string;
        url: string | null;
        active: boolean;
    }[];
}

const Card = () => {
    const { animals } = usePage<{animals: IPaginateResults<IAnimal[]>}>().props;

    return (
        <div className={'flex flex-wrap gap-8 m-2 justify-center h-fit'}>
            {animals.data.map((animal:IAnimal) => (
                <Link title={`Vers la fiche de ${animal.name}`} href={route('animals.show', { animal: animal.slug })} key={animal.id} className={'h-auto w-[250px] rounded-lg shadow-lg dark:bg-[#1c1e21]'}>
                    <div className={'relative'}>
                        {/*<img className={'rounded-t-lg'} src={animal.photo?.medium ? `/storage${animal.photo.medium}` : 'https://fastly.picsum.photos/id/237/250/190.jpg?hmac=Ytps3oz1RzMVeuF4dclkzZL2SmeBKE_2-sWjFcjVRRk' } alt={`Photo de ${animal.name}`} width={250} height={190} />*/}
                        <img className={'rounded-t-lg'} src={animal.photo_url?.medium ?? 'https://fastly.picsum.photos/id/237/250/190.jpg?hmac=Ytps3oz1RzMVeuF4dclkzZL2SmeBKE_2-sWjFcjVRRk' } alt={`Photo de ${animal.name}`} width={250} height={190} />
                        <Badge className={`absolute top-2 right-2 text-black ${animal.adoption_status === 'En attente' ? 'bg-main' : animal.adoption_status === 'Disponible' ? 'bg-[#A7DE98]' : animal.adoption_status === 'Adopté' ? 'bg-[#B74553] text-[#fff]' : 'bg-[#fff]'}`}>
                            {animal.adoption_status}
                        </Badge>
                        {/*<div
                            className={`absolute bottom-0 w-full ${
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
                        </div>*/}
                    </div>
                    <p className={'p-6 text-center text-2xl font-bold'}>{animal.name}</p>
                    <div className={'bg-main/25 m-auto mb-2 flex w-[80%] justify-center rounded-md p-1 text-black dark:text-white'}>
                        <svg
                            className={'mr-2'}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10 20h4" />
                            <path d="M12 16v6" />
                            <path d="M17 2h4v4" />
                            <path d="m21 2-5.46 5.46" />
                            <circle cx="12" cy="11" r="5" />
                        </svg>
                        {animal.gender}
                    </div>
                    <div className={'bg-main/25 m-auto mb-2 flex w-[80%] justify-center rounded-md p-1 text-black dark:text-white stroke-[#09090B] dark:stroke-white'}>
                        <svg className={'mr-2'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M11 6C12.1046 6 13 5.10457 13 4C13 2.89543 12.1046 2 11 2C9.89543 2 9 2.89543 9 4C9 5.10457 9.89543 6 11 6Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18 10C19.1046 10 20 9.10457 20 8C20 6.89543 19.1046 6 18 6C16.8954 6 16 6.89543 16 8C16 9.10457 16.8954 10 18 10Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 18C21.1046 18 22 17.1046 22 16C22 14.8954 21.1046 14 20 14C18.8954 14 18 14.8954 18 16C18 17.1046 18.8954 18 20 18Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.00024 10C9.65685 10 10.307 10.1293 10.9137 10.3806C11.5203 10.6319 12.0715 11.0002 12.5358 11.4645C13.0001 11.9288 13.3684 12.48 13.6196 13.0866C13.8709 13.6932 14.0002 14.3434 14.0002 15V18.5C14 19.3365 13.7001 20.1452 13.1551 20.7796C12.61 21.4141 11.8557 21.8324 11.0288 21.9587C10.202 22.085 9.35719 21.9111 8.64753 21.4683C7.93787 21.0255 7.41025 20.3432 7.16024 19.545C6.73357 18.1683 5.83357 17.2667 4.46024 16.84C3.66242 16.5901 2.9804 16.0629 2.5376 15.3538C2.09479 14.6446 1.92045 13.8004 2.04612 12.9739C2.1718 12.1473 2.58918 11.3931 3.22274 10.8476C3.85631 10.3021 4.6642 10.0015 5.50024 10H9.00024Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {animal.breed?.breed}
                    </div>
                    <div className={'bg-main/25 m-auto mb-2 flex w-[80%] justify-center rounded-md p-1 text-black dark:text-white'}>
                        <svg className={'mr-2 stroke-[#09090B] dark:stroke-white'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M20 21V13C20 12.4696 19.7893 11.9609 19.4142 11.5858C19.0391 11.2107 18.5304 11 18 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V21M4 16C4 16 4.5 15 6 15C7.5 15 8.5 17 10 17C11.5 17 12.5 15 14 15C15.5 15 16.5 17 18 17C19.5 17 20 16 20 16M2 21H22M7 8V11M12 8V11M17 8V11M7 4H7.01M12 4H12.01M17 4H17.01"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className={'mt-0.5'}>{animal.age}</span>
                    </div>
                    <div className={'bg-main/25 m-auto mb-4 flex w-[80%] justify-center rounded p-1 stroke-[#09090B] dark:stroke-white'}>
                        Parrainages&nbsp;: {animal.sponsors_count ?? 0}
                    </div>
                    {/*
                    <div className={'bg-opacity m-auto mb-4 flex w-[80%] justify-center rounded-md p-1'}>
                        <svg className={'mr-2'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M2 12H5M5 12C5 15.866 8.13401 19 12 19M5 12C5 8.13401 8.13401 5 12 5M19 12H22M19 12C19 15.866 15.866 19 12 19M19 12C19 8.13401 15.866 5 12 5M12 2V5M12 19V22M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                stroke="#09090B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Localisation
                    </div>
                    */}
                </Link>
            ))}
            <div className="mt-4 flex gap-2 w-full justify-center h-fit">
                {animals.data.length > 0 ? (
                animals.links.map((link, index: number) => (
                    <Link
                        title={link.label}
                        key={index}
                        href={link.url || '#'}
                        className={`rounded border px-4 py-2 ${link.active ? 'bg-gray-200 text-black' : 'text-gray-400'}`}
                    >
                        {link.label}
                    </Link>
                ))) : (
                    <div className={'flex flex-col items-center justify-center gap-2 h-full'}>
                        <Ban/>
                        <p>Aucun animal pour le moment.</p>
                        {route().current('sponsorship') && (<Button asChild className={'bg-main hover:bg-hover font-bold text-black'}><Link href={'/animals'}>Parrainer un animal</Link></Button>)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
