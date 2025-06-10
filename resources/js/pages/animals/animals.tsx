import { toast } from 'sonner';
import { IAnimal } from '@/types/IAnimal';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { ENDPOINTS } from '@/config/endpoints';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Animaux',
        href: '/animals',
    },
];

interface PageProps extends InertiaPageProps {
    success?: string;
    access?: string;
    userRole: string;
}

const Animals = () => {
    const { props } = usePage<PageProps>();

    useEffect(() => {
        if (props.success) {
            toast.success(props.success);
        }

        if (props.access) {
            toast.warning(props.access);
        }
    }, [props.success, props.access]);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<IAnimal[]>([]);

    useEffect(() => {
        const fetchDefaultAnimals = async (): Promise<void> => {
            try {
                const res: Response = await fetch(ENDPOINTS.SEARCH_URL2);
                const data: IAnimal[] = await res.json();
                setResults(data);
            } catch (error) {
                console.log('Erreur lors du chargement par défaut :', error);
            }
        };

        fetchDefaultAnimals();
    }, []);

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const value = e.currentTarget.value;
        setQuery(value);

        //let url = `http://pfe.test/search?query=${value}`;
        let url = `https://petshelter.be/search?query=${value}`;
        if (value.length === 0) {
            url = ENDPOINTS.SEARCH_URL2;
        }

        const res: Response = await fetch(url);
        const data: IAnimal[] = await res.json();
        setResults(data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Animaux'} />
            <div className={'p-6 h-full flex flex-col'}>
                {props.userRole.includes('Administrateur') && (
                    <Button asChild className={'bg-main hover:bg-hover text-black ml-auto font-bold mb-4'}>
                        <Link href={route('animals.create')} title={'Ajouter un animal'}>
                            Ajouter un animal
                        </Link>
                    </Button>
                )}
                <div className="w-full">
                    <div className={'relative flex items-center w-[400px] max-md:w-full my-2'}>
                        <svg className={'absolute left-3 size-5'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21.0002 21L16.7002 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                stroke="#999"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <Input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Rechercher un animal..."
                            className="caret-main border-gray-500 py-5 pl-10 text-black bg-[#fff] dark:bg-[#1c1e21] dark:text-white"
                        />
                    </div>
                    {results.length > 0 ? (
                        <div className={'mt-8 flex flex-wrap justify-center gap-8'}>
                            {results.map((animal) => (
                                <Link href={route('animals.show', { id: animal.id})} key={animal.id} className="w-[250px] rounded-lg bg-[#fff] dark:bg-[#1c1e21] shadow-lg">
                                    {/*<img className={'h-auto rounded-t-lg'} src={`/storage/${animal.photo}`} alt={`Photo de ${animal.name}`} loading={'lazy'} />*/}
                                    <img className={'rounded-full h-full'} src={animal.photo_url} alt={`Photo de ${animal.name}`} loading={'lazy'} />
                                    <p className="font-bold text-center text-2xl p-6">{animal.name}</p>
                                    <div className={'bg-main/25 m-auto mb-2 flex w-[80%] justify-center rounded p-1'}>
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
                                    <div className={'bg-main/25 m-auto mb-2 flex w-[80%] justify-center rounded p-1 stroke-[#09090B] dark:stroke-white'}>
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
                                        {animal.breed.breed}
                                    </div>
                                    <div className={'bg-main/25 m-auto mb-4 flex w-[80%] justify-center rounded p-1 stroke-[#09090B] dark:stroke-white'}>
                                        <svg className={'mr-2'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M20 21V13C20 12.4696 19.7893 11.9609 19.4142 11.5858C19.0391 11.2107 18.5304 11 18 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V21M4 16C4 16 4.5 15 6 15C7.5 15 8.5 17 10 17C11.5 17 12.5 15 14 15C15.5 15 16.5 17 18 17C19.5 17 20 16 20 16M2 21H22M7 8V11M12 8V11M17 8V11M7 4H7.01M12 4H12.01M17 4H17.01"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span className={'mt-0.5'}>{animal.age}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className={'my-8 flex items-center justify-center text-gray-500'}>
                            <svg className={'mr-2'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M13.5 8.5L8.5 13.5M8.5 8.5L13.5 13.5M21.0002 21L16.7002 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                    stroke="#6A7282"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Aucun r&eacute;sultats.
                        </p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Animals;
