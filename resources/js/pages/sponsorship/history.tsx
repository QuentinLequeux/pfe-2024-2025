import { Ban } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { ITransaction } from '@/types/ITransaction';
import { Head, Link, router } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dons',
        href: '/history',
    },
];

type LinkType = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedTransactions = {
    data: ITransaction[];
    links: LinkType[];
    current_page: number;
    last_page: number;
};

type props = {
    transactions: PaginatedTransactions;
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
                            <TableHead className={'font-bold'}>
                                Refuge
                            </TableHead>
                            <TableHead className={'font-bold'}>
                                Animal
                            </TableHead>
                            <TableHead className={'text-right font-bold'}>
                                Montant
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <div className={'flex justify-center items-center p-2'}>
                                        <Ban className={'mr-2'}/>Aucune donn&eacute;es.
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.data.map((transaction) => (
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
                                    <TableCell className={'flex items-center gap-2'}>
                                        <Badge className={'bg-[#51A13D] dark:text-white'}>
                                            {transaction.status === 'complete' ? 'Validée' : transaction.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {transaction.method === 'card' ? 'Carte' : transaction.method}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.organization?.name ?? '-'}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.animal?.name ?? '-'}
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
                            <TableCell colSpan={6}>
                                Total
                            </TableCell>
                            <TableCell className={'text-right font-bold'}>
                                {total}&nbsp;€
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <div className="mt-4 flex gap-2 w-full justify-center h-fit">
                    {transactions.links.map((link, index: number) => (
                            <Link
                                title={link.label}
                                key={index}
                                href={link.url || '#'}
                                className={`rounded border px-4 py-2 ${link.active ? 'bg-gray-200 text-black' : 'text-gray-400'}`}
                            >
                                {link.label}
                            </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}

// TODO : reçu(PDF).
