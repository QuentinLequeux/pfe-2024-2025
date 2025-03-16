import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { animals, catanddog, charleroi, croixbleue, dashboard, lalouviere, mouscron, sanscollier, veeweyde } from '../assets/img';
import SearchAnimals from '@/components/petshelter/search-animals';

function ScrollButton() {
    const [isVisible, setIsVisible] = useState(false);
    const viewportHeight = 600;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > viewportHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            className={`bg-main fixed right-10 bottom-10 rounded-[50%] p-2 shadow-xl transition-opacity duration-500 max-md:right-5 ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
            <Link href={'#'} onClick={scrollToTop}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8L8 1M8 1L15 8M8 1V15" stroke="#09090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </div>
    );
}

{
    /* Quid du composant ? */
}

export default function Welcome() {
    return (
        <>
            <Head title="Accueil"></Head>
            <div className={'bg-[#eee]'}>
                <header className={'fixed w-screen bg-[#fff] shadow-sm'}>
                    <h1 className={'sr-only'}>PetShelter</h1>
                    {/* Logo */}
                    <nav className={'m-auto flex w-[80%] items-center justify-between'} aria-label={'main-navigation'}>
                        <h2 className={'sr-only'}>Navigation principale</h2>
                        <Link href={'#'} title={"Vers la page d'accueil"} className={'h-fit font-bold text-[#000]'} aria-label={'home'}>
                            PetShelter
                        </Link>
                        <div className={'m-3 flex justify-end'}>
                            <Button
                                asChild
                                variant={'outline'}
                                className={'hover:border-main hover:text-main mr-2 bg-[#fff] font-bold text-[#000] hover:bg-[#fff]'}
                            >
                                <Link title={'Se connecter'} href={route('login')}>
                                    Connexion
                                </Link>
                            </Button>
                            <Button asChild className={'bg-main hover:bg-hover font-bold'}>
                                <Link title={"S'inscrire"} href={route('register')}>
                                    S&rsquo;inscrire
                                </Link>
                            </Button>
                        </div>
                    </nav>
                </header>
                <main>
                    <div>
                        <section className={'m-auto flex w-[80%] flex-col items-center gap-8 pt-35'}>
                            <h2 className={'max-w-[50%] text-center text-5xl font-black text-black max-md:max-w-[100%]'}>
                                Un clic, un <strong className={'text-main'}>parrainage</strong>, une chance pour eux&nbsp;!
                            </h2>
                            <p className={'max-w-[50%] text-center text-lg text-black max-md:max-w-[100%]'}>
                                Offrez-leur une seconde chance grâce au parrainage. Déjà de nombreux animaux soutenus… et si vous faisiez la
                                différence&nbsp;?
                            </p>
                            <Button asChild className={'bg-main hover:bg-hover mb-16 font-bold'}>
                                <Link title={"S'inscrire"} href={route('register')}>
                                    S&rsquo;inscrire
                                </Link>
                            </Button>
                            <div className={'w-[100%]'}>
                                <img src={dashboard} alt={''} className={'rounded-2xl shadow-2xl'} loading={'lazy'} />
                                {/* Changer image */}
                            </div>
                        </section>
                    </div>
                    <div className={'py-16'}>
                        <section className={'m-auto w-[80%]'}>
                            <h2 className={'py-8 text-center text-3xl font-bold text-black'}>Nos partenaires</h2>
                            <div className={'flex items-center gap-20 overflow-x-auto whitespace-nowrap max-md:gap-10 md:justify-center'}>
                                <Link href={'https://www.sanscollier.be/'} title={'Vers www.sanscollier.be'} target={'_blank'}>
                                    <img src={sanscollier} alt={'logo sanscollier'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </Link>
                                <Link href={'https://www.spalalouviere.be/'} title={'Vers www.spalalouviere.be'} target={'_blank'}>
                                    <img src={lalouviere} alt={'logo spa la louvière'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </Link>
                                <Link href={'https://www.spa-charleroi.be/'} title={'Vers www.spa-charleroi.be'} target={'_blank'}>
                                    <img src={charleroi} alt={'logo spa charleroi'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </Link>
                                <Link href={'https://www.croixbleue.be/'} title={'Vers www.croixbleue.be'} target={'_blank'}>
                                    <img src={croixbleue} alt={'logo croix bleue'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </Link>
                                <Link href={'https://www.spa-mouscron.be/'} title={'Vers www.spa-mouscron.be'} target={'_blank'}>
                                    <img src={mouscron} alt={'logo spa mouscron'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </Link>
                                <Link href={'https://www.veeweyde.be/'} title={'Vers www.veeweyde.be'} target={'_blank'}>
                                    <img src={veeweyde} alt={'logo veeweyde'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </Link>
                            </div>
                        </section>
                    </div>
                    <div className={'bg-main'}>
                        <section className={'m-auto flex w-[80%] flex-wrap gap-8 py-20'}>
                            <div className={'m-auto'}>
                                <img src={animals} alt={''} className={'rounded-2xl shadow-2xl'} loading={'lazy'} />
                            </div>
                            <div className={'m-auto max-w-[40%] min-w-[350px] max-xl:max-w-[100%]'}>
                                <h2 className={'mb-8 text-2xl font-bold text-black'}>Donnez-leur une seconde chance grâce au parrainage&nbsp;!</h2>
                                <p className={'text-black'}>
                                    Chaque jour, de nombreux animaux attendent une famille ou un soutien pour subvenir à leurs besoins. Notre
                                    plateforme vous permet de les aider en devenant parrain. Grâce à votre contribution, vous participez à leur
                                    bien-être en aidant aux frais de nourriture, de soins et d’hébergement. Parrainer un animal, c’est lui offrir une
                                    vie meilleure, même à distance. En échange, vous recevez des nouvelles régulières et suivez son évolution. Chaque
                                    clic compte, chaque geste fait la différence. Rejoignez notre communauté solidaire et devenez un maillon essentiel
                                    de cette belle aventure&nbsp;!
                                </p>
                            </div>
                        </section>
                    </div>
                    <div>
                        <section className={'m-auto flex w-[80%] flex-wrap gap-8 py-20'}>
                            <div className={'m-auto max-w-[40%] min-w-[300px] max-lg:max-w-[100%]'}>
                                <h2 className={'mb-8 text-2xl font-bold text-black'}>Trouvez votre protégé et changez sa vie ❤️</h2>
                                <p className={'text-black'}>
                                    Parcourez notre sélection d’animaux en attente de parrainage et trouvez celui qui vous touche le plus. Grâce à
                                    notre moteur de recherche, filtrez par espèce, race, âge ou situation pour découvrir ceux qui ont besoin de vous.
                                    En un clic, vous pouvez offrir un soutien précieux à un animal en difficulté. Apprenez-en plus sur son histoire,
                                    ses besoins et rejoignez l’aventure du parrainage pour lui donner une seconde chance.
                                </p>
                            </div>
                            <SearchAnimals/>
                        </section>
                    </div>
                    <div className={'bg-main py-20'}>
                        <section
                            className={'m-auto flex w-[80%] justify-between rounded-2xl bg-[#fff] shadow-2xl max-lg:flex-wrap max-lg:justify-center'}
                        >
                            <div className={'my-auto ml-16 max-w-[50%] max-lg:mx-16 max-lg:mt-16 max-lg:max-w-[100%]'}>
                                <h2 className={'text-2xl font-bold text-black'}>Inscrivez-vous d&egrave;s maintenant et soutenez un animal&nbsp;!</h2>
                                <p className={'my-6 text-black'}>
                                    S&rsquo;inscrire, c&rsquo;est simple et rapide&nbsp;! Rejoignez notre communaut&eacute; et commencez &agrave;
                                    soutenir un animal en quelques clics.
                                </p>
                                <Button asChild className={'bg-main hover:bg-hover font-bold'}>
                                    <Link title={"S'inscrire"} href={route('register')}>
                                        S&rsquo;inscrire
                                    </Link>
                                </Button>
                            </div>
                            <img src={catanddog} alt={''} loading={'lazy'} className={'h-fit'} />
                        </section>
                    </div>
                </main>
                <footer>
                    <ScrollButton />
                    <div className={'m-auto flex w-[80%] justify-between py-8'}>
                        <div>
                            <Link href={'#'} title={"Vers la page d'accueil"} className={'font-bold text-black'}>
                                PetShelter
                            </Link>
                            {/* Logo */}
                        </div>
                        <div className={'flex'}>
                            <Link
                                href={'https://github.com/QuentinLequeux'}
                                target={'_blank'}
                                title={'Vers le GitHub de Quentin Lequeux'}
                                className={'mr-2'}
                            >
                                <GitHub />
                            </Link>
                            <Link
                                href={'https://www.linkedin.com/in/quentin-lequeux-8a11a3192/'}
                                target={'_blank'}
                                title={'Vers le Linkedin de Quentin Lequeux'}
                            >
                                <Linkedin />
                            </Link>
                        </div>
                    </div>
                    <div className={'m-auto w-[80%] border-b-1 border-gray-300'}></div>
                    <div className={'m-auto flex w-[80%] justify-between py-8'}>
                        <p className={'text-sm text-gray-500'}>© 2025 Quentin Lequeux.</p>
                        <Link href={'#'} title={"Vers la page des conditions d'utilisations"} className={'text-sm text-black'}>
                            Conditions d&rsquo;utilisation
                        </Link>
                    </div>
                </footer>
            </div>
        </>
    );
}

{
    /* Quid des SVG ? */
}

const GitHub: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M15 22V18C15.1392 16.7473 14.78 15.4901 14 14.5C17 14.5 20 12.5 20 9C20.08 7.75 19.73 6.52 19 5.5C19.28 4.35 19.28 3.15 19 2C19 2 18 2 16 3.5C13.36 3 10.64 3 8.00004 3.5C6.00004 2 5.00004 2 5.00004 2C4.70004 3.15 4.70004 4.35 5.00004 5.5C4.27191 6.51588 3.91851 7.75279 4.00004 9C4.00004 12.5 7.00004 14.5 10 14.5C9.61004 14.99 9.32004 15.55 9.15004 16.15C8.98004 16.75 8.93004 17.38 9.00004 18M9.00004 18V22M9.00004 18C4.49004 20 4 16 2 16"
                stroke="#09090B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const Linkedin: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                stroke="#09090B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M6 9H2V21H6V9Z" stroke="#09090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                stroke="#09090B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
