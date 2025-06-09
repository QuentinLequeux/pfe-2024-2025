import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { IBreed } from '@/types/IBreed';
import { BreadcrumbItem } from '@/types';
import { CalendarIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { IOrganization } from '@/types/IOrganization';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props = {
    organization: IOrganization;
    statuses: string[];
    breeds: IBreed[];
    gender: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajouter un animal',
        href: '/animals/create',
    },
];

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
        photo: null as File | null,
        description: '',
    });

    const [date, setDate] = React.useState<Date>();
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    const submit: FormEventHandler = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('animals.store'), {
            forceFormData: true,
            onError: () => {
                toast.warning('Vérifiez bien les champs !');
            }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] ?? null;
        setData('photo', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Ajouter un animal'} />
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
                    <form className={'flex flex-col gap-4'} onSubmit={submit} encType={'multipart/form-data'}>
                        <div className={'w-[40%] max-md:w-[100%]'}>
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
                            <InputError message={errors.organization_id} />
                        </div>
                        <div className={'flex w-[40%] max-md:w-[100%] flex-col gap-8 max-md:gap-4 lg:flex-row'}>
                            <div className={'w-full min-w-[200px] '}>
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
                                <InputError message={errors.name} />
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
                                <InputError message={errors.age} />
                            </div>
                        </div>
                        <div className={'flex w-[40%] max-md:w-[100%] flex-col gap-8 max-md:gap-4 lg:flex-row'}>
                            <div className={'w-full min-w-[200px]'}>
                                <Label htmlFor={'weight'}>Poids</Label>
                                <Input
                                    type={'number'}
                                    id={'weight'}
                                    placeholder={'Poids'}
                                    value={data.weight}
                                    onChange={(e) => setData('weight', e.target.value)}
                                />
                                <InputError message={errors.weight} />
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
                                <InputError message={errors.arrival_date} />
                            </div>
                        </div>
                        <div className={'flex w-[40%] max-md:w-[100%] flex-col gap-8 lg:flex-row'}>
                            <div className={'w-full'}>
                                <Label>
                                    Race&nbsp;<span className={'text-orange-500'}>*</span>
                                </Label>
                                <Select required onValueChange={(value) => setData('breed_id', value)}>
                                    <SelectTrigger className={'min-w-[200px]'}>
                                        <SelectValue placeholder={'Choisir une race'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel className={'font-bold'}>Chien</SelectLabel>
                                            {breeds.filter((breed) => breed.specie_id === 1).map((breed) => (
                                                <SelectItem key={breed.id} value={breed.id.toString()}>
                                                    {breed.breed}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                        <SelectGroup>
                                            <SelectLabel className={'font-bold'}>Chat</SelectLabel>
                                            {breeds.filter((breed) => breed.specie_id === 2).map((breed) => (
                                                <SelectItem key={breed.id} value={breed.id.toString()}>
                                                    {breed.breed}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.breed_id} />
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
                        <div className={'flex w-[40%] max-md:w-[100%] flex-col gap-8 max-md:gap-4 lg:flex-row'}>
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
                                <InputError message={errors.gender} />
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
                                <InputError message={errors.adoption_status} />
                            </div>
                        </div>
                        <div className={'w-[40%] max-md:w-[100%]'}>
                            <Label htmlFor={'photo'}>
                                Photo&nbsp;<span className={'text-orange-500'}>*</span>
                            </Label>
                            <Input
                                className={'py-2'}
                                type={'file'}
                                id={'photo'}
                                onChange={handleFileChange}
                                accept={'.png, .jpg, .jpeg, .svg, .webp'}
                            />
                            <InputError message={errors.photo} />
                            {previewUrl && (
                                <div className="mt-2">
                                    <p>Pr&eacute;visualisation&nbsp;:</p>
                                    <img
                                        src={previewUrl}
                                        alt="Prévisualisation"
                                        className="max-w-[300px] h-auto rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                        <div className={'w-[40%] max-md:w-[100%]'}>
                            <Label htmlFor={'description'}>Description</Label>
                            <Textarea
                                id={'description'}
                                placeholder={'Ajoutez une description'}
                                rows={4}
                                className={'max-h-[300px]'}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>
                        <Button type={'submit'} className={'bg-main hover:bg-hover font-bold text-black w-[40%] max-md:w-full'}>
                            Ajouter
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;

// TODO : Layout formulaire
