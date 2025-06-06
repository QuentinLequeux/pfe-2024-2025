import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Donation',
        href: '/donation',
    },
];

const Checkout = () => {
    const [animalId, setAnimalId] = useState<number | null>(null);
    const { errors, post, data, setData } = useForm({
        amount: '',
        animal_id: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('animal');
        if (id) {
            setAnimalId(Number(id));
            setData('animal_id', id);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/donation', {
            onSuccess: (page) => {
                if (page.props.url) {
                    window.location.href = page.props.url as string;
                }
            },
        });
    };

    const quickDonate = (amount: number) => {
        setData({
            amount: String(amount),
            animal_id: animalId?.toString() ?? '',
        });
        router.post('/donation', { amount }, {
            onSuccess: (page) => {
                if (page.props.url) {
                    window.location.href = page.props.url as string;
                }
            },
        });
    };

    const presetAmounts = [5, 20, 40, 100];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Donation'} />
            <div className={'p-6'}>
                <h2 aria-level={2} role={'heading'} className={'text-2xl font-bold'}>
                    Donation
                </h2>
                <p className={'text-sm my-2'}>
                    D&eacute;duction fiscale &agrave; partir de 40€ en Belgique
                </p>
                <div className={'flex gap-4 my-4'}>
                    {presetAmounts.map((amount) => (
                        <Button
                            className={'bg-main hover:bg-hover font-bold text-[#000]'}
                            key={amount}
                            type={'button'}
                            onClick={() => quickDonate(amount)}
                        >
                            {amount}&nbsp;€
                        </Button>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className={'flex flex-col w-[400px] max-w-[90%] gap-4'}>
                    <div className={'relative'}>
                        <Label htmlFor={'amount'}>
                            Montant libre
                        </Label>
                        <Input
                            id={'amount'}
                            className={'w-[400px] max-w-[100%]'}
                            type={'text'}
                            value={data.amount}
                            onChange={(e) => {
                                const value = e.target.value.replace(',', '.');
                                setData('amount', value);
                            }}
                            placeholder={'Montant'}
                            required={true}
                        />
                        <div className={'absolute top-8 right-4'}>
                            €
                        </div>
                    </div>
                    <InputError message={errors.amount} />
                    <InputError message={errors.animal_id} />
                    <p className={'text-sm'}>
                        Vous allez être redirig&eacute; vers une page de paiement
                    </p>
                    <Button type={'submit'} className={'bg-main hover:bg-hover font-bold text-[#000]'}>
                        Payer {data.amount ? `${data.amount} €` : ""}
                    </Button>
                    <div className={'flex items-center gap-1 mx-auto my-2'}>
                        <p className={'text-neutral-500 text-xs'}>
                            Propuls&eacute; par
                        </p>
                        <svg focusable="false" width="33"
                             height="15" role="img" aria-labelledby="stripe-title"><title id="stripe-title">Stripe</title>
                            <g fillRule="evenodd">
                                <path
                                    d="M32.956 7.925c0-2.313-1.12-4.138-3.261-4.138-2.15 0-3.451 1.825-3.451 4.12 0 2.719 1.535 4.092 3.74 4.092 1.075 0 1.888-.244 2.502-.587V9.605c-.614.307-1.319.497-2.213.497-.876 0-1.653-.307-1.753-1.373h4.418c0-.118.018-.588.018-.804zm-4.463-.859c0-1.02.624-1.445 1.193-1.445.55 0 1.138.424 1.138 1.445h-2.33zM22.756 3.787c-.885 0-1.454.415-1.77.704l-.118-.56H18.88v10.535l2.259-.48.009-2.556c.325.235.804.57 1.6.57 1.616 0 3.089-1.302 3.089-4.166-.01-2.62-1.5-4.047-3.08-4.047zm-.542 6.225c-.533 0-.85-.19-1.066-.425l-.009-3.352c.235-.262.56-.443 1.075-.443.822 0 1.391.922 1.391 2.105 0 1.211-.56 2.115-1.39 2.115zM18.04 2.766V.932l-2.268.479v1.843zM15.772 3.94h2.268v7.905h-2.268zM13.342 4.609l-.144-.669h-1.952v7.906h2.259V6.488c.533-.696 1.436-.57 1.716-.47V3.94c-.289-.108-1.346-.307-1.879.669zM8.825 1.98l-2.205.47-.009 7.236c0 1.337 1.003 2.322 2.34 2.322.741 0 1.283-.135 1.581-.298V9.876c-.289.117-1.716.533-1.716-.804V5.865h1.716V3.94H8.816l.009-1.96zM2.718 6.235c0-.352.289-.488.767-.488.687 0 1.554.208 2.241.578V4.202a5.958 5.958 0 0 0-2.24-.415c-1.835 0-3.054.957-3.054 2.557 0 2.493 3.433 2.096 3.433 3.17 0 .416-.361.552-.867.552-.75 0-1.708-.307-2.467-.723v2.15c.84.362 1.69.515 2.467.515 1.879 0 3.17-.93 3.17-2.548-.008-2.692-3.45-2.213-3.45-3.225z"></path>
                            </g>
                        </svg>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Checkout;
