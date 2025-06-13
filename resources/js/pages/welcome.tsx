import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, PawPrint } from 'lucide-react';
import ScrollButton from '@/components/petshelter/scroll-button';
import SearchAnimals from '@/components/petshelter/search-animals';
import { animals, catanddog, charleroi, croixbleue, dashboard, lalouviere, mouscron, sanscollier, veeweyde } from '../assets/img';

export default function Welcome() {
    return (
        <>
            <Head title="Accueil"></Head>
            <div className={'bg-[#eee]'}>
                <header className={'fixed z-10 w-screen bg-[#fff] shadow-sm'}>
                    <h1 aria-level={1} role={'heading'} className={'sr-only'}>
                        PetShelter
                    </h1>
                    <nav className={'m-auto flex w-[80%] items-center justify-between'} aria-label={'main-navigation'}>
                        <h2 aria-level={2} role={'heading'} className={'sr-only'}>
                            Navigation principale
                        </h2>
                        <div className={'flex items-center gap-2'}>
                            <PawPrint color={'#E8A87C'} />
                            <Link href={'#'} title={"Vers la page d'accueil"} className={'h-[20px] font-bold text-black'} aria-label={'home'}>
                                PetShelter
                            </Link>
                        </div>
                        <div className={'m-3 flex justify-end'}>
                            <Button
                                asChild
                                variant={'outline'}
                                className={'hover:border-main hover:text-main mr-2 bg-[#fff] font-bold text-black hover:bg-[#fff]'}
                            >
                                <Link title={'Se connecter'} href={route('login')}>
                                    Connexion
                                </Link>
                            </Button>
                            <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
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
                            <Button asChild className={'bg-main hover:bg-hover mb-16 font-bold text-black'}>
                                <Link title={"S'inscrire"} href={route('register')}>
                                    S&rsquo;inscrire
                                </Link>
                            </Button>
                            <div className={'w-[100%]'}>
                                <img src={dashboard} alt={"Image d'une fiche animale"} className={'rounded-2xl shadow-2xl'} width={'1920'} height={'997'} />
                            </div>
                        </section>
                    </div>
                    <div className={'py-16'}>
                        <section className={'m-auto w-[80%]'}>
                            <h2 className={'py-8 text-center text-3xl font-bold text-black'}>Nos partenaires</h2>
                            <div className={'flex items-center gap-20 overflow-x-auto whitespace-nowrap max-md:gap-10 md:justify-center'}>
                                <a href={'https://www.sanscollier.be/'} title={'Vers www.sanscollier.be'} target={'_blank'} role={'link'}>
                                    <img src={sanscollier} alt={'logo sanscollier'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.spalalouviere.be/'} title={'Vers www.spalalouviere.be'} target={'_blank'} role={'link'}>
                                    <img src={lalouviere} alt={'logo spa la louvière'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.spa-charleroi.be/'} title={'Vers www.spa-charleroi.be'} target={'_blank'} role={'link'}>
                                    <img src={charleroi} alt={'logo spa charleroi'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.croixbleue.be/'} title={'Vers www.croixbleue.be'} target={'_blank'} role={'link'}>
                                    <img src={croixbleue} alt={'logo croix bleue'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.spa-mouscron.be/'} title={'Vers www.spa-mouscron.be'} target={'_blank'} role={'link'}>
                                    <img src={mouscron} alt={'logo spa mouscron'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.veeweyde.be/'} title={'Vers www.veeweyde.be'} target={'_blank'} role={'link'}>
                                    <img src={veeweyde} alt={'logo veeweyde'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                            </div>
                        </section>
                    </div>
                    <div className={'bg-main'}>
                        <section className={'m-auto flex w-[80%] flex-wrap gap-8 py-20'}>
                            <div className={'m-auto'}>
                                <img src={animals} alt={''} className={'rounded-2xl shadow-2xl'} loading={'lazy'} width={'640'} height={'377'} />
                            </div>
                            <div className={'m-auto max-w-[40%] min-w-[300px] max-xl:max-w-[100%]'}>
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
                            <SearchAnimals />
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
                                <Button asChild className={'bg-main hover:bg-hover font-bold text-black'}>
                                    <Link title={"S'inscrire"} href={route('register')}>
                                        S&rsquo;inscrire
                                    </Link>
                                </Button>
                            </div>
                            <img src={catanddog} alt={'Image de chien et chat'} loading={'lazy'} className={'aspect-square h-fit'} width={'400'} height={'400'} />
                        </section>
                    </div>
                </main>
                <footer>
                    <div className={'flex justify-center gap-2 mt-8'}>
                        <svg
                            className="icon icon--full-color"
                            viewBox="0 0 38 24"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            width="38"
                            height="24"
                            aria-labelledby="pi-master"
                        >
                            <title id="pi-master">Mastercard</title>
                            <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                            <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                            <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                            <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                            <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path>
                        </svg>
                        <svg
                            className="icon icon--full-color"
                            viewBox="0 0 38 24"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            width="38"
                            height="24"
                            aria-labelledby="pi-visa"
                        >
                            <title id="pi-visa">Visa</title>
                            <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                            <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                            <path
                                d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                                fill="#142688"
                            ></path>
                        </svg>
                    </div>
                    <ScrollButton />
                    <div className={'m-auto flex w-[80%] justify-between py-8'}>
                        <div>
                            <div className={'flex items-center gap-2'}>
                                <PawPrint color={'#E8A87C'} />
                                <Link href={'#'} title={"Vers la page d'accueil"} className={'h-[20px] font-bold text-black'}>
                                    PetShelter
                                </Link>
                            </div>
                        </div>
                        <div className={'flex'}>
                            <a
                                href={'https://github.com/QuentinLequeux'}
                                target={'_blank'}
                                title={'Vers le GitHub de Quentin Lequeux'}
                                className={'mr-2'}
                                role={'link'}
                            >
                                <Github color={'#000'} />
                            </a>
                            <a
                                href={'https://www.linkedin.com/in/quentin-lequeux-8a11a3192/'}
                                target={'_blank'}
                                title={'Vers le Linkedin de Quentin Lequeux'}
                                role={'link'}
                            >
                                <Linkedin color={'#000'} />
                            </a>
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
