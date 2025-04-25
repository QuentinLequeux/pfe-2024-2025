import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { IBreed } from '@/types/IBreed';
import { IOrganization } from '@/types/IOrganization';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type Props = {
    organization: IOrganization;
    statuses: string[];
    breeds: IBreed[];
    gender: string[];
};

const Create = ({ organization, statuses, breeds, gender }: Props) => {
    const { data, setData, post, errors } = useForm({
        organization_id: '',
        name: '',
        age: '',
        weight: '',
        arrival_date: '',
        breed_id: '',
        gender: '',
        adoption_status: '',
        description: '',
    });

    const [date, setDate] = React.useState<Date>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('animals.store'));
    };

    return (
        <AppLayout>
            <Head />
            <div>
                <div className={'m-8'}>
                    <h2 aria-level={2} role={'heading'} className={'mb-2 text-2xl font-bold'}>
                        Ajouter un animal
                    </h2>
                    <p>
                        <span className={'text-orange-500'}>*</span> Champs obligatoires
                    </p>
                </div>
                <div className={'m-8'}>
                    <form className={'flex flex-col gap-4'} onSubmit={submit}>
                        <div className={'w-[40%] min-w-[300px]'}>
                            <Label>
                                Organisation&nbsp;<span className={'text-orange-500'}>*</span>
                            </Label>
                            <Select required onValueChange={(value) => setData('organization_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={'Choisir une organisation'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={organization.id.toString()}>{organization.name}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={'flex w-[40%] flex-col gap-8 lg:flex-row'}>
                            <div className={'w-full min-w-[200px]'}>
                                <Label htmlFor={'name'}>
                                    Nom&nbsp;<span className={'text-orange-500'}>*</span>
                                </Label>
                                <Input
                                    type={'text'}
                                    id={'name'}
                                    placeholder={'Nom'}
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className={'text-[#B74553] font-medium'}>{errors.name}</p>}
                            </div>
                            <div className={'w-full min-w-[200px]'}>
                                <Label htmlFor={'age'}>
                                    Age&nbsp;<span className={'text-orange-500'}>*</span>
                                </Label>
                                <Input
                                    type={'number'}
                                    id={'age'}
                                    placeholder={'Age'}
                                    required
                                    value={data.age}
                                    onChange={(e) => setData('age', e.target.value)}
                                />
                                {errors.age && <p className={'text-[#B74553] font-medium'}>{errors.age}</p>}
                            </div>
                        </div>
                        <div className={'flex w-[40%] flex-col gap-8 lg:flex-row'}>
                            <div className={'w-full min-w-[200px]'}>
                                <Label htmlFor={'weight'}>Poids</Label>
                                <Input
                                    type={'number'}
                                    id={'weight'}
                                    placeholder={'Poids'}
                                    value={data.weight}
                                    onChange={(e) => setData('weight', e.target.value)}
                                />
                                {errors.weight && <p className={'text-[#B74553] font-medium'}>{errors.weight}</p>}
                            </div>
                            <div className={'w-full'}>
                                <Label htmlFor={''}>
                                    Date d'arriv&eacute;e&nbsp;<span className={'text-orange-500'}>*</span>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full min-w-[200px] justify-start font-normal', !date && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon className={'mr-2 h-4 w-4'} />
                                            {date ? format(date, 'PPP', { locale: fr }) : <span>Choisir une date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                            mode={'single'}
                                            selected={date}
                                            onSelect={(selectedDate) => {
                                                setDate(selectedDate);
                                                if (selectedDate) {
                                                    setData('arrival_date', format(selectedDate, 'yyyy-MM-dd'));
                                                }
                                            }}
                                            locale={fr}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className={'flex w-[40%] flex-col gap-8 lg:flex-row'}>
                            <div className={'w-full'}>
                                <Label>
                                    Race&nbsp;<span className={'text-orange-500'}>*</span>
                                </Label>
                                <Select required onValueChange={(value) => setData('breed_id', value)}>
                                    <SelectTrigger className={'min-w-[200px]'}>
                                        <SelectValue placeholder={'Choisir une race'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {breeds.map((breed) => (
                                            <SelectItem key={breed.id} value={breed.id.toString()}>
                                                {breed.breed}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/*
                            <div className={'w-full'}>
                                <Label>
                                    Esp&egrave;ce&nbsp;<span className={'text-orange-500'}>*</span>
                                </Label>
                                <Select required onValueChange={(value) => setData('specie_id', value)}>
                                    <SelectTrigger className={'min-w-[200px]'}>
                                        <SelectValue placeholder={'Choisir une espèce'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {species.map((specie) => (
                                            <SelectItem key={specie.id} value={specie.id.toString()}>
                                                {specie.specie}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            */}
                        </div>
                        <div className={'flex w-[40%] flex-col gap-8 lg:flex-row'}>
                            <div className={'w-full'}>
                                <Label>
                                    Sexe&nbsp;<span className={'text-orange-500'}>*</span>
                                </Label>
                                <Select required onValueChange={(value) => setData('gender', value)}>
                                    <SelectTrigger className={'min-w-[200px]'}>
                                        <SelectValue placeholder={'Choisir un sexe'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {gender.map((gender) => (
                                            <SelectItem key={gender} value={gender}>
                                                {gender}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className={'w-full'}>
                                <Label>
                                    Statut&nbsp;<span className={'text-orange-500'}>*</span>
                                </Label>
                                <Select required onValueChange={(value) => setData('adoption_status', value)}>
                                    <SelectTrigger className={'min-w-[200px]'}>
                                        <SelectValue placeholder={'Choisir un statut'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {/*
                        <div className={'w-[40%] min-w-[300px]'}>
                            <Label htmlFor={'photo'}>
                                Photo&nbsp;<span className={'text-orange-500'}>*</span>
                            </Label>
                            <Input type={'file'} id={'photo'} placeholder={'Photo'} value={''} />
                        </div>
                        */}
                        <div className={'w-[40%] min-w-[300px]'}>
                            <Label htmlFor={'description'}>Description</Label>
                            <Textarea
                                id={'description'}
                                placeholder={'Ajoutez une description'}
                                rows={4}
                                className={'max-h-[300px]'}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            {errors.description && <p className={'text-[#B74553] font-medium'}>{errors.description}</p>}
                        </div>
                        <Button type={'submit'} className={'bg-main hover:bg-hover w-[40%] font-bold'}>
                            Ajouter
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
