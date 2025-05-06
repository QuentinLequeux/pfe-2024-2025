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
import { IAnimal } from '@/types/IAnimal';
import { toast } from 'sonner';
import { BreadcrumbItem } from '@/types';

type Props = {
    organization: IOrganization;
    statuses: string[];
    breeds: IBreed[];
    gender: string[];
    animal: IAnimal;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Modifier',
        href: '#',
    },
];

const Create = ({ organization, statuses, breeds, gender, animal }: Props) => {
    const selectedBreed = breeds.find(breed => breed.id === animal.breed_id);

    const { data, setData, post, errors } = useForm({
        organization_id: organization.id.toString() || '',
        name: animal.name || '',
        age: animal.age || '',
        weight: animal.weight || '',
        arrival_date: animal.arrival_date || '',
        breed_id: selectedBreed ? selectedBreed.id.toString() : '',
        gender: animal.gender || '',
        adoption_status: animal.adoption_status || '',
        photo: null,
        description: animal.description || '',
    });

    const [date, setDate] = React.useState<Date | undefined>(animal.arrival_date ? new Date(animal.arrival_date) : undefined);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('animals.update', animal.id), {
            forceFormData: true,
            onError: () => {
                toast.warning('Vérifiez bien les champs !');
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
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
            <Head />
            <div>
                <div className={'m-8'}>
                    <h2 aria-level={2} role={'heading'} className={'mb-2 text-2xl font-bold'}>
                        Modifier un animal
                    </h2>
                    <p>
                        <span className={'text-orange-500'}>*</span> Champs obligatoires
                    </p>
                </div>
                <div className={'m-8'}>
                    <form className={'flex flex-col gap-4'} onSubmit={submit} encType={'multipart/form-data'}>
                        <div className={'w-[40%] min-w-[300px]'}>
                            <Label>
                                Organisation&nbsp;<span className={'text-orange-500'}>*</span>
                            </Label>
                            <Select required value={organization.id.toString()} onValueChange={(value) => setData('organization_id', value)}>
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
                                <Select required value={data.breed_id} onValueChange={(value) => setData('breed_id', value)}>
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
                                <Select required defaultValue={animal.gender} onValueChange={(value) => setData('gender', value)}>
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
                                <Select required defaultValue={animal.adoption_status} onValueChange={(value) => setData('adoption_status', value)}>
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
                        <div className={'w-[40%] min-w-[300px]'}>
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
                            {errors.photo && <p className={'text-[#B74553] font-medium'}>{errors.photo}</p>}
                            {animal.photo && (
                                <div className="mt-2">
                                    <p>Photo actuelle&nbsp;:</p>
                                    <img
                                        src={`/storage/${animal.photo}`}
                                        alt="Photo actuelle"
                                        className="max-w-[300px] h-auto rounded-lg"
                                    />
                                </div>
                            )}
                            {previewUrl && (
                                <div className="mt-2">
                                    <p>Nouvelle photo&nbsp;:</p>
                                    <img
                                        src={previewUrl}
                                        alt="Prévisualisation"
                                        className="max-w-[300px] h-auto rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
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
                            Modifier
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
