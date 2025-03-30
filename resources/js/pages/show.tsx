import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

interface IAnimal {
    name: string;
}

const Show = () => {
    const { animal } = usePage<{ animal: IAnimal }>().props;

    return (
        <AppLayout>
            <Head title={'Animal'}/>
            <div>
                <h2>
                    { animal.name }
                </h2>
            </div>
        </AppLayout>
    )
}

export default Show;
