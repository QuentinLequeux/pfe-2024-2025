import { Ban } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ITransaction } from '@/types/ITransaction';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dons',
        href: '/history',
    },
];

type props = {
    transactions: ITransaction[];
    total: number;
    sort: string;
}

export default function History({ transactions, total, sort }: props) {
    const handleSortChange = (value: string) => {
        router.get('/history', { sort: value }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Dons'} />
            <div className={'p-6'}>
                <div className={'w-[150px] mb-2'}>
                    <Select onValueChange={handleSortChange} defaultValue={sort}>
                        <SelectTrigger>
                            <SelectValue placeholder={'Date'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'-created_at'}>R&eacute;cents</SelectItem>
                            <SelectItem value={'created_at'}>Anciens</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableCaption>
                        Don r&eacute;cents
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={'w-[300px] font-bold'}>
                                Date
                            </TableHead>
                            <TableHead className={'font-bold'}>
                                Identifiant
                            </TableHead>
                            <TableHead className={'font-bold'}>
                                Statut
                            </TableHead>
                            <TableHead className={'font-bold'}>
                                M&eacute;thode
                            </TableHead>
                            <TableHead className={'text-right font-bold'}>
                                Montant
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className={'flex justify-center items-center p-2'}>
                                        <Ban className={'mr-2'}/>Aucune donn&eacute;es.
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        {new Date(transaction.created_at).toLocaleDateString('fr-BE', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.stripe_id}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.status === 'complete' ? 'Validée' : transaction.status}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.method === 'card' ? 'Carte' : transaction.method}
                                    </TableCell>
                                    <TableCell className={'text-right'}>
                                        {transaction.amount}&nbsp;€
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>
                                Total
                            </TableCell>
                            <TableCell className={'text-right font-bold'}>
                                {total}&nbsp;€
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </AppLayout>
    )
}

// TODO : Pagination
