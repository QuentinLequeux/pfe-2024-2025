import { useState } from 'react';

const SearchAnimals = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    {/*const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            const res = await fetch(`http://pfe.test/search?query=${value}`);
            const data = await res.json();
            console.log('Données reçues :', data);
            setResults(data);
        } else {
            setResults([]);
        }
    };*/}

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        let url = `http://pfe.test/search?query=${value}`;
        if (value.length === 0) {
            url = `http://pfe.test/search`; // Pour récupérer les trois premiers animaux par défaut
        }

        const res = await fetch(url);
        const data = await res.json();
        console.log("Données reçues :", data);
        setResults(data);
    };

    return (
        <div className="mx-auto max-w-lg">
            <input type="text" value={query} onChange={handleSearch} placeholder="Rechercher un animal..." className="w-full rounded border p-2 text-black" />

            {results.length > 0 ? (
                <div className="mt-2 rounded bg-white p-3 shadow">
                    {results.map((animal) => (
                        <div key={animal.id} className="flex items-center border-b p-2">
                            <div className="ml-3">
                                <h3 className="font-bold text-black">{animal.name}</h3>
                                <p className={'text-black'}>{animal.race}</p>
                                <p className={'text-black'}>Âge : {animal.age} ans</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={'text-black'}>Aucun résultats</p>
            )}
        </div>
    );
};

export default SearchAnimals;
