import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'products',
        href: '/products',
    },
];
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface pageprops {
    flash: {
        message?: string;
    };
    products: Product[];
}
export default function Index() {
    const { products, flash } = usePage().props as pageprops;

    const {processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete product -${id}. ${name}?`)) {
            destroy(route('products.destroy', id)); 
            
        }            

    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-4">
                <Link href={route('products.create')}>
                    <Button>Create a Product</Button>
                </Link>
            </div>
            <div className="m-4">
                <div>
                    {flash.message && (
                        <Alert>
                            <TriangleAlert />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {products.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                            
                                <TableCell className="text-right">
                                    <Button className='bg-slate-600 hover:bg-slate-900 mx-3'>Edit</Button>
                                    <Button disabled={processing} onClick={() => handleDelete(product.id, product.name)} className='bg-red-500 hover:bg-red-700'>Delete</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
