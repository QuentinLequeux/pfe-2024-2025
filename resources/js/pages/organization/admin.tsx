import { toast } from 'sonner';
import { IUser } from '@/types/IUser';
import React, { useEffect } from 'react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { IOrganization } from '@/types/IOrganization';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Associer un utilisateur',
        href: '/organization/admin'
    }
];

type Props = {
    organizations: IOrganization[];
    users: IUser[];
    roles: { id: number; name: string; }[];
};

interface PageProps extends InertiaPageProps {
    access?: string;
}

export default function Admin({ users, organizations, roles }: Props) {
    const { data, setData, post, errors } = useForm<{ user_id: string; organization_id: string | null, role: string; }>({
        user_id: '',
        organization_id: null,
        role: '',
    });

    const { props } = usePage<PageProps>();

    useEffect(() => {
        if (props.access) {
            toast.warning(props.access);
        }
    }, [props.access]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('organization.admin.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Associer un utilisateur'} />
            <div className={'flex w-fit flex-col gap-4 p-6'}>
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
                            onValueChange={(value) => setData('user_id', value)}
                            value={data.user_id}>
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
                        <InputError message={errors.user_id} />
                    </div>
                    <div>
                        <Label>
                            Organisation&nbsp;<span className={'text-orange-500'}>*</span>
                        </Label>
                        <Select
                            required
                            onValueChange={(value) => setData('organization_id', value === 'none' ? null : value)}
                            value={data.organization_id ?? 'none'}
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
                        <InputError message={errors.organization_id} />
                    </div>
                    <div>
                        <Label>
                            Rôle&nbsp;<span className={'text-orange-500'}>*</span>
                        </Label>
                        <Select required
                                onValueChange={(value) => setData('role', value)}
                                value={data.role}>
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
                        <InputError message={errors.role} />
                    </div>
                    <Button title={'Associer'} type={'submit'} className={'bg-main hover:bg-hover font-bold text-black'}>
                        Associer
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
