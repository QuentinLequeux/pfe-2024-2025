import { Link } from '@inertiajs/react';
import { IAnimal } from '@/types/IAnimal';
import { Input } from '@/components/ui/input';
import { ENDPOINTS } from '@/config/endpoints';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useEffect, useState } from 'react';

const SearchAnimals = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<IAnimal[]>([]);

    useEffect(() => {
        const fetchDefaultAnimals = async (): Promise<void> => {
            try {
                const res: Response = await fetch(ENDPOINTS.SEARCH_URL); // Récupérer les trois premiers animaux
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
            url = ENDPOINTS.SEARCH_URL; // Récupérer les trois premiers animaux par défaut
        }

        const res: Response = await fetch(url);
        const data: IAnimal[] = await res.json();
        setResults(data);
    };

    return (
        <div className="m-auto max-w-[100%]">
            <div className={'relative flex items-center'}>
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
                    className="caret-main border-gray-500 py-5 pl-10 text-black bg-[#fff]"
                />
            </div>
            {results.length > 0 ? (
                <ul className={'mt-8'}>
                    {results.map((animal) => (
                        <li key={animal.id} className="flex items-center my-4">
                            <div className="flex min-w-[320px] w-full items-center rounded-2xl bg-[#fff] p-4 shadow-lg hover:bg-gray-100">
                                <div className={'flex gap-3'}>
                                    <div className={'h-[50px] w-[50px] rounded-full bg-gray-300'}>
                                        {/*<img className={'rounded-full h-full'} src={animal.photo === null ? 'https://fastly.picsum.photos/id/237/50/50.jpg?hmac=9cCVRLgc5HmY_XbEZ4SSgnaR5CqTMUtHPZ04MCvtH-k' : `/storage/${animal.photo}`} alt={`Photo de ${animal.name}`} loading={'lazy'} width={50} height={50} />*/}
                                        <img className={'rounded-full h-full'} src={animal.photo_url === null ? 'https://fastly.picsum.photos/id/237/50/50.jpg?hmac=9cCVRLgc5HmY_XbEZ4SSgnaR5CqTMUtHPZ04MCvtH-k' : `${animal.photo_url}`} alt={`Photo de ${animal.name}`} loading={'lazy'} />
                                    </div>
                                    <div className={'flex flex-col overflow-hidden'}>
                                        <p className="font-bold text-black">{animal.name}</p>
                                        <p className="text-black max-w-[135px]">{animal.breed.breed}</p>
                                    </div>
                                </div>
                                <Button asChild className={'bg-main hover:bg-hover text-black ml-auto font-bold'} title={'Parrainer'}>
                                    <Link href={route('register')}>Parrainer</Link>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
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
    );
};

export default SearchAnimals;
