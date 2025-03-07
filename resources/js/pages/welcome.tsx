import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import charleroi from '../assets/img/charleroi.webp';
import croixbleue from '../assets/img/croixbleue.png';
import lalouviere from '../assets/img/lalouviere.webp';
import mouscron from '../assets/img/mouscron.png';
import sanscollier from '../assets/img/sanscollier.png';
import veeweyde from '../assets/img/veeweyde.png';

function ScrollButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <div className={`bg-main fixed right-10 max-md:right-5 bottom-10 rounded-[50%] p-2 shadow-xl ${ isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <Link href={'#'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8L8 1M8 1L15 8M8 1V15" stroke="#09090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Link>
        </div>
    )
}

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="stylesheet" href="https://use.typekit.net/xcu5nly.css" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className={'min-h-screen bg-[#EEE]'}>
                <header className={'fixed w-screen bg-white shadow-md'}>
                    <nav className={'m-auto flex w-[80%] items-center justify-between'}>
                        <Link href={'#'} className={'h-fit text-black'}>
                            Logo
                        </Link>
                        <div className={'m-4 flex justify-end'}>
                            <Button variant={'outline'} className={'hover:bg-main mr-2 bg-white text-black hover:border-none hover:text-black'}>
                                <Link href={route('login')}>Connexion</Link>
                            </Button>
                            <Button variant={'outline'} className={'bg-main hover:bg-hover border-none text-black hover:text-black'}>
                                <Link href={route('register')}>Essayer gratuitement</Link>
                            </Button>
                        </div>
                    </nav>
                </header>
                <main>
                    <div>
                        <section className={'m-auto flex w-[80%] flex-col items-center gap-8 pt-30'}>
                            <h2 className={'text-5xl font-black text-black'}>
                                Un clic, un <span className={'text-main'}>parrainage</span>, une chance pour eux&nbsp;!
                            </h2>
                            <p className={'text-black'}>
                                Offrez-leur une seconde chance grâce au parrainage. Déjà de nombreux animaux soutenus… et si vous faisiez la
                                différence ?
                            </p>
                            <Button className={'bg-main hover:bg-hover mb-16 border-none text-black hover:text-black'}>
                                <Link href={route('register')}>Essayer gratuitement</Link>
                            </Button>
                            <div className={'h-[600px] w-[80%] rounded-2xl shadow-2xl'}></div>
                        </section>
                    </div>
                    <div className={'py-16'}>
                        <section className={'m-auto w-[80%]'}>
                            <h2 className={'py-8 text-center text-2xl font-bold text-black'}>Nos partenaires</h2>
                            <div className={'flex items-center md:justify-center gap-16 max-md:gap-6 overflow-x-auto whitespace-nowrap'}>
                                <a href={'#'}>
                                    <img src={sanscollier} alt={''} className={"max-w-[100px] max-h-[100px]"} />
                                </a>
                                <a href={'#'}>
                                    <img src={lalouviere} alt={''} className={"max-w-[100px] max-h-[100px]"} />
                                </a>
                                <a href={'#'}>
                                    <img src={charleroi} alt={''} className={"max-w-[100px] max-h-[100px]"} />
                                </a>
                                <a href={'#'}>
                                    <img src={croixbleue} alt={''} className={"max-w-[100px] max-h-[100px]"} />
                                </a>
                                <a href={'#'}>
                                    <img src={mouscron} alt={''} className={"max-w-[100px] max-h-[100px]"} />
                                </a>
                                <a href={'#'}>
                                    <img src={veeweyde} alt={''} className={"max-w-[100px] max-h-[100px]"} />
                                </a>
                            </div>
                        </section>
                    </div>
                    <div className={'bg-main'}>
                        <section className={'m-auto flex w-[80%] flex-wrap items-center justify-between gap-8 py-16'}>
                            <div className={'m-auto h-[400px] w-[50%] min-w-[350px] rounded-2xl bg-white shadow-2xl'}></div>
                            <div className={'m-auto max-w-[40%] min-w-[350px]'}>
                                <h2 className={'mb-8 text-2xl font-bold text-black'}>Donnez-leur une seconde chance grâce au parrainage&nbsp;!</h2>
                                <p className={'text-black'}>
                                    Chaque jour, de nombreux animaux attendent une famille ou un soutien pour subvenir à leurs besoins. Notre
                                    plateforme vous permet de les aider en devenant parrain. Grâce à votre contribution, vous participez à leur
                                    bien-être en aidant aux frais de nourriture, de soins et d’hébergement. Parrainer un animal, c’est lui offrir une
                                    vie meilleure, même à distance. En échange, vous recevez des nouvelles régulières et suivez son évolution. Chaque
                                    clic compte, chaque geste fait la différence. Rejoignez notre communauté solidaire et devenez un maillon essentiel
                                    de cette belle aventure !
                                </p>
                            </div>
                        </section>
                    </div>
                    <div>
                        <section className={'m-auto flex w-[80%] flex-wrap items-center justify-between gap-8 py-16'}>
                            <div className={'m-auto max-w-[40%] min-w-[300px]'}>
                                <h2 className={'mb-8 text-2xl font-bold text-black'}>Trouvez votre protégé et changez sa vie ❤️</h2>
                                <p className={'text-black'}>
                                    Parcourez notre sélection d’animaux en attente de parrainage et trouvez celui qui vous touche le plus. Grâce à
                                    notre moteur de recherche, filtrez par espèce, race, âge ou situation pour découvrir ceux qui ont besoin de vous.
                                    En un clic, vous pouvez offrir un soutien précieux à un animal en difficulté. Apprenez-en plus sur son histoire,
                                    ses besoins et rejoignez l’aventure du parrainage pour lui donner une seconde chance.
                                </p>
                            </div>
                            <div className={'m-auto h-[400px] w-[50%] min-w-[350px] rounded-2xl shadow-2xl'}></div>
                        </section>
                    </div>
                    <div className={'bg-main py-16'}>
                        <section className={'m-auto flex w-[80%] flex-col items-center rounded-2xl bg-white'}>
                            <h2 className={'py-16 text-2xl font-bold text-black'}>Inscrivez-vous dès maintenant et soutenez un animal&nbsp;!</h2>
                            <Button className={'bg-main hover:bg-hover mb-16 border-none text-black hover:text-black'}>
                                <Link href={route('register')}>Essayer gratuitement</Link>
                            </Button>
                        </section>
                    </div>
                </main>
                <footer>
                    <ScrollButton/>
                    <div className={'m-auto flex w-[80%] justify-between py-8'}>
                        <div>
                            <Link href={'#'} className={'text-black'}>
                                Logo
                            </Link>
                        </div>
                        <div className={'flex'}>
                            <Link href={'https://github.com/QuentinLequeux'} title={'Vers le GitHub de Quentin Lequeux'} className={'mr-2'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M15 22V18C15.1392 16.7473 14.78 15.4901 14 14.5C17 14.5 20 12.5 20 9C20.08 7.75 19.73 6.52 19 5.5C19.28 4.35 19.28 3.15 19 2C19 2 18 2 16 3.5C13.36 3 10.64 3 8.00004 3.5C6.00004 2 5.00004 2 5.00004 2C4.70004 3.15 4.70004 4.35 5.00004 5.5C4.27191 6.51588 3.91851 7.75279 4.00004 9C4.00004 12.5 7.00004 14.5 10 14.5C9.61004 14.99 9.32004 15.55 9.15004 16.15C8.98004 16.75 8.93004 17.38 9.00004 18M9.00004 18V22M9.00004 18C4.49004 20 4 16 2 16"
                                        stroke="#09090B"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </Link>
                            <Link href={'https://www.linkedin.com/in/quentin-lequeux-8a11a3192/'} title={'Vers le Linkedin de Quentin Lequeux'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                                        stroke="#09090B"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path d="M6 9H2V21H6V9Z" stroke="#09090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                                        stroke="#09090B"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className={'m-auto w-[80%] border-b-1 border-gray-300'}></div>
                    <div className={'m-auto flex w-[80%] justify-between py-8'}>
                        <p className={'text-sm text-black'}>© 2025 Quentin Lequeux.</p>
                        <Link href={'#'} className={'text-sm text-black'}>
                            Conditions d’utilisation
                        </Link>
                    </div>
                </footer>
            </div>
        </>
    );
}
