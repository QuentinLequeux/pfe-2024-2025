import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

interface IAnimal {
    name: string;
    breed_id: number;
}

const Show = () => {
    const { animal } = usePage<{ animal: IAnimal }>().props;

    return (
        <AppLayout>
            <Head title={'Animal'} />
            <div className={'h-full'}>
                <div className={'h-fit w-full rounded-b-full shadow-md'}>
                    <h2 className={'flex items-center justify-center py-8 text-3xl font-bold'}>
                        Hello, moi c'est&nbsp;<span className={'text-main'}>{animal.name}</span>
                    </h2>
                </div>
                <div className={'mt-8 flex justify-center gap-8'}>
                    <div className={'h-[600px] w-[800px] rounded-2xl bg-[#eee]'}></div>
                    <div className={'flex flex-col gap-8'}>
                        <div className={'flex h-[100px] w-[300px] flex-col items-center justify-center gap-2 rounded-2xl bg-[#eee]'}>
                            <p className={'font-bold'}>Lui venir en aide&nbsp;?</p>
                            <Button className={'bg-main hover:bg-hover w-fit font-bold'}>Parrainer</Button>
                        </div>
                        <div className={'h-[300px] w-[300px] rounded-2xl bg-[#eee] flex flex-col items-center justify-center gap-2'}>
                            <p>Organisation name</p>
                            <p>Organisation address</p>
                            <p>Organisation phone</p>
                            <p>Organisation email</p>
                            <Button className={'bg-main hover:bg-hover font-bold'}>
                                En savoir plus
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={'h-[1000px]'}></div>
                {/*
                   <div className={'flex justify-around fixed h-[70px] shadow-fixed bottom-2 right-[-10] rounded-b-2xl items-center w-full bg-[#fff]'}>
                    <div className={''}>
                        <div className={'w-[50px] h-[50px] rounded-full bg-gray-300'}></div>
                    </div>
                    <div className={''}>
                        <Button className={'bg-main hover:bg-hover font-bold'}>
                            Parrainer
                        </Button>
                    </div>
                </div>
                */}
                <div className={'shadow-fixed sticky bottom-0 flex h-[70px] items-center justify-around rounded-b-2xl bg-[#fff]'}>
                    <div className={'flex gap-4'}>
                        <div className={'h-[50px] w-[50px] rounded-full bg-gray-300'}></div>
                        <div>
                            <p>{animal.name}</p>
                            <p>{animal.breed_id}</p>
                        </div>
                    </div>
                    <div className={''}>
                        <Button className={'bg-main hover:bg-hover font-bold'}>Parrainer</Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
