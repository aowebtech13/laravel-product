import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';


interface product{
    id: number;
    name: string;
    price: string;
    description: string;    
}
interface Props {
    product: product;
    errors: Record<string, string>;
}
export default function Edit({product}: Props) {
    const {data, setData, put, processing, errors } =useForm({
        name: product.name,
        price: product.price,
        description: product.description
    });

    const handleUpdate =(e :React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
       
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Product', href:`/products/${product.name}/edit`}]}>
            <Head title="Edit A Product" />
            <div className='w-8/12 p-4'>
               <form onSubmit={handleUpdate} className='space-y-4'>
                {/*Display Errorr */}
                {Object.keys(errors).length > 0 &&(
                    <Alert>
                   <CircleAlert className="h-4 w-4" />
                    <AlertTitle>Errors!</AlertTitle>
                    <AlertDescription>
                   <ul>
                    {Object.entries(errors).map(([key, message]) => (
                        <li key={key}>{message as string}

                        </li>
                    ))}
                   </ul>
                    </AlertDescription>
                  </Alert>
                ) }
                <div className='gap-1.5'>
                    <Label htmlFor="product name">Name</Label>
                    <Input placeholder="Product Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                </div>
                <div className='gap-1.5'>
                    <Label htmlFor="product price"> Price</Label>
                    <Input placeholder="Price" value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                </div>
                <div className='gap-1.5'>
                    <Label htmlFor="Description"> Description</Label>
                    <Textarea placeholder="Products description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                </div>
                <Button disabled={processing} type="submit">Edit Product</Button>
               </form>
            </div>
        </AppLayout>
    );
}
