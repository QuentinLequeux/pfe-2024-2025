import { toast } from 'sonner';
import { IUser } from '@/types/IUser';
import React, { useEffect } from 'react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { IOrganization } from '@/types/IOrganization';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

type Props = {
    organizations: IOrganization[];
    users: IUser[];
    roles: { id: number; name: string; }[];
};

type ServerProps = {
    access?: string;
    users: IUser[];
    organizations: IOrganization[];
    roles: { id: number; name: string }[];
};

export default function Create({ users, organizations, roles }: Props) {
    const { data, setData, post, errors } = useForm<Required<RegisterForm>>({
        name: '',
        address: '',
        phone: '',
        email: '',
        iban: '',
        website: '',
    });

    const { data: assocData, setData: setAssocData, post: postAssoc, errors: assocErrors } = useForm<{user_id: string; organization_id: string | null, role: string; }>({
        user_id: '',
        organization_id: null,
        role: '',
    })

    const { props } = usePage<ServerProps>();

    useEffect(() => {
        if (props.access) {
            toast.warning(props.access);
        }
    }, [props.access]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('organization.create'));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postAssoc(route('organization.admin.update'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Créer une organisation'} />
            <div className={'flex flex-wrap'}>
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
                                aria-describedby={'name-help'}
                            />
                            <p id={'name-help'} className={'mt-1 text-xs'}>Maximum 255 caractères.</p>
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
                                aria-describedby={'address-help'}
                            />
                            <p id={'address-help'} className={'mt-1 text-xs'}>Rue, num&eacute;ro, code postal et ville.</p>
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
                                aria-describedby={'phone-help'}
                            />
                            <p id={'phone-help'} className={'mt-1 text-xs'}>Format&nbsp;: +32 suivi du num&eacute;ro sans espaces.</p>
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
                                aria-describedby={'email-help'}
                            />
                            <p id={'email-help'} className={'mt-1 text-xs'}>Doit être une adresse email valide.</p>
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
                                aria-describedby={'iban-help'}
                            />
                            <p id={'iban-help'} className={'mt-1 text-xs'}>Format&nbsp;: BE suivi de 14 chiffres.</p>
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
                                aria-describedby={'website-help'}
                            />
                            <p id={'website-help'} className={'mt-1 text-xs'}>Format&nbsp;: https://example.be</p>
                            <InputError message={errors.website} />
                        </div>
                        <Button title={'Créer'} type={'submit'} className={'bg-main hover:bg-hover font-bold text-black mt-4 w-full'}>
                            Cr&eacute;er
                        </Button>
                    </form>
                </div>
                <div className={'flex flex-col gap-4 p-6 w-[500px] max-md:w-full'}>
                    <h2 aria-level={2} role={'heading'} className={'text-xl font-bold'}>
                        Associer un utilisateur &agrave; une organisation
                    </h2>
                    <p>
                        <span className={'text-orange-500'}>*</span>&nbsp;Champs obligatoires
                    </p>
                    <form className={'flex flex-col gap-4'} onSubmit={handleSubmit}>
                        <div>
                            <Label>
                                Utilisateur&nbsp;<span className={'text-orange-500'}>*</span>
                            </Label>
                            <Select
                                required
                                onValueChange={(value) => setAssocData('user_id', value)}
                                value={assocData.user_id}>
                                <SelectTrigger>
                                    <SelectValue placeholder={'Choisir un utilisateur'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user.id} value={user.id.toString()}>
                                            {user.email}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={assocErrors.user_id} />
                        </div>
                        <div>
                            <Label>
                                Organisation&nbsp;<span className={'text-orange-500'}>*</span>
                            </Label>
                            <Select
                                required
                                onValueChange={(value) => setAssocData('organization_id', value === 'none' ? null : value)}
                                value={assocData.organization_id ?? 'none'}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={'Choisir une organisation'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'none'}>Aucune&nbsp;organisation</SelectItem>
                                    {organizations.map((organization) => (
                                        <SelectItem key={organization.id} value={organization.id.toString()}>
                                            {organization.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={assocErrors.organization_id} />
                        </div>
                        <div>
                            <Label>
                                Rôle&nbsp;<span className={'text-orange-500'}>*</span>
                            </Label>
                            <Select required
                                    onValueChange={(value) => setAssocData('role', value)}
                                    value={assocData.role}>
                                <SelectTrigger>
                                    <SelectValue placeholder={'Choisir un rôle'}></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.name}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={assocErrors.role} />
                        </div>
                        <Button title={'Associer'} type={'submit'} className={'bg-main hover:bg-hover font-bold text-black'}>
                            Associer
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
