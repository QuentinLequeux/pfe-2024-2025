import React from 'react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Créer une organisation',
        href: '/organization/create',
    },
];

type RegisterForm = {
    name: string;
    address: string;
    phone: string;
    email: string;
    iban: string;
    website: string;
}

export default function Create() {
    const { data, setData, post, errors } = useForm<Required<RegisterForm>>({
        name: '',
        address: '',
        phone: '',
        email: '',
        iban: '',
        website: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('organization.create'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Créer une organisation'} />
            <div className={'flex flex-col gap-4 p-6 w-[500px] max-md:w-full'}>
                <h2 aria-level={2} role={'heading'} className={'text-xl font-bold'}>
                    Cr&eacute;er une organisation
                </h2>
                <p><span className={'text-orange-500'}>*</span>&nbsp;Champs obligatoires</p>
                <form className={'flex flex-col gap-4'} onSubmit={submit}>
                    <div>
                        <Label htmlFor={'name'}>
                            Nom&nbsp;<span className={'text-orange-500'}>*</span>
                        </Label>
                        <Input
                            id={'name'}
                            type={'text'}
                            required
                            placeholder={'Société protectrice des animaux'}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div>
                        <Label htmlFor={'address'}>
                            Adresse&nbsp;<span className={'text-orange-500'}>*</span>
                        </Label>
                        <Input
                            id={'address'}
                            type={'text'}
                            required
                            placeholder={'Rue Peetermans 80, 4100 Seraing'}
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <InputError message={errors.address} />
                    </div>
                    <div>
                        <Label htmlFor={'phone'}>
                            T&eacute;l&eacute;phone&nbsp;<span className={'text-orange-500'}>*</span>
                        </Label>
                        <Input
                            id={'phone'}
                            type={'text'}
                            required
                            placeholder={'+32456123456'}
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div>
                        <Label htmlFor={'email'}>
                            Email&nbsp;<span className={'text-orange-500'}>*</span>
                        </Label>
                        <Input
                            id={'email'}
                            type={'email'}
                            required
                            placeholder={'example@example.com'}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div>
                        <Label htmlFor={'iban'}>
                            IBAN&nbsp;<span className={'text-orange-500'}>*</span>
                        </Label>
                        <Input
                            id={'iban'}
                            type={'text'}
                            required
                            placeholder={'BE012345678910111'}
                            value={data.iban}
                            onChange={(e) => setData('iban', e.target.value)}
                        />
                        <InputError message={errors.iban} />
                    </div>
                    <div>
                        <Label htmlFor={'website'}>
                            Site&nbsp;web&nbsp;<span className={'text-orange-500'}>*</span>
                        </Label>
                        <Input
                            id={'website'}
                            type={'text'}
                            required
                            placeholder={'https://www.example.be'}
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                        />
                        <InputError message={errors.website} />
                    </div>
                    <Button type={'submit'} className={'bg-main hover:bg-hover font-bold text-black mt-4 w-full'}>
                        Cr&eacute;er
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

// TODO : Typer les données envoyées.
