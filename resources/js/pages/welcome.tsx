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
                <header className={'fixed w-screen bg-[#fff] shadow-sm z-10'}>
                    <h1 className={'sr-only'}>PetShelter</h1>
                    <nav className={'m-auto flex w-[80%] items-center justify-between'} aria-label={'main-navigation'}>
                        <h2 className={'sr-only'}>Navigation principale</h2>
                        <div className={'flex gap-2 items-center'}>
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
                            <Button asChild className={'bg-main hover:bg-hover text-black font-bold'}>
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
                            <Button asChild className={'bg-main hover:bg-hover text-black mb-16 font-bold'}>
                                <Link title={"S'inscrire"} href={route('register')}>
                                    S&rsquo;inscrire
                                </Link>
                            </Button>
                            <div className={'w-[100%]'}>
                                <img src={dashboard} alt={'Image d\'une fiche animale'} className={'rounded-2xl shadow-2xl'} loading={'lazy'} />
                            </div>
                        </section>
                    </div>
                    <div className={'py-16'}>
                        <section className={'m-auto w-[80%]'}>
                            <h2 className={'py-8 text-center text-3xl font-bold text-black'}>Nos partenaires</h2>
                            <div className={'flex items-center gap-20 overflow-x-auto whitespace-nowrap max-md:gap-10 md:justify-center'}>
                                <a href={'https://www.sanscollier.be/'} title={'Vers www.sanscollier.be'} target={'_blank'}>
                                    <img src={sanscollier} alt={'logo sanscollier'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.spalalouviere.be/'} title={'Vers www.spalalouviere.be'} target={'_blank'}>
                                    <img src={lalouviere} alt={'logo spa la louvière'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.spa-charleroi.be/'} title={'Vers www.spa-charleroi.be'} target={'_blank'}>
                                    <img src={charleroi} alt={'logo spa charleroi'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.croixbleue.be/'} title={'Vers www.croixbleue.be'} target={'_blank'}>
                                    <img src={croixbleue} alt={'logo croix bleue'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.spa-mouscron.be/'} title={'Vers www.spa-mouscron.be'} target={'_blank'}>
                                    <img src={mouscron} alt={'logo spa mouscron'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                                <a href={'https://www.veeweyde.be/'} title={'Vers www.veeweyde.be'} target={'_blank'}>
                                    <img src={veeweyde} alt={'logo veeweyde'} className={'max-h-[100px] max-w-[100px]'} loading={'lazy'} />
                                </a>
                            </div>
                        </section>
                    </div>
                    <div className={'bg-main'}>
                        <section className={'m-auto flex w-[80%] flex-wrap gap-8 py-20'}>
                            <div className={'m-auto'}>
                                <img src={animals} alt={''} className={'rounded-2xl shadow-2xl'} loading={'lazy'} />
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
                                <Button asChild className={'bg-main hover:bg-hover text-black font-bold'}>
                                    <Link title={"S'inscrire"} href={route('register')}>
                                        S&rsquo;inscrire
                                    </Link>
                                </Button>
                            </div>
                            <img src={catanddog} alt={'Image de chien et chat'} loading={'lazy'} className={'h-fit aspect-square'} />
                        </section>
                    </div>
                </main>
                <footer>
                    <ScrollButton />
                    <div className={'m-auto flex w-[80%] justify-between py-8'}>
                        <div>
                            <div className={'flex gap-2 items-center'}>
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
                            >
                                <Github color={'#000'} />
                            </a>
                            <a
                                href={'https://www.linkedin.com/in/quentin-lequeux-8a11a3192/'}
                                target={'_blank'}
                                title={'Vers le Linkedin de Quentin Lequeux'}
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
