import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Plus, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchForms } from "@/hooks/useFetchForms";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"
import {Toaster} from "@/components/ui/sonner";
import * as React from "react";
import { Link } from '@inertiajs/react';
import { useDeleteForm } from "@/hooks/useDeleteForm";

export default function Forms() {
    const { forms, loading, error, refetch } = useFetchForms();
    const { deleteForm, loading: deleteLoading, error: deleteError } = useDeleteForm(refetch);

    if (error) {
        toast("Error loading forms: " + error);
    }

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this form?")) {
            deleteForm(id);
        }
    };

    return (
        <main className="w-full h-full flex flex-col">
            <div className="w-full p-4 flex justify-between items-center">
                <h1 className="text-2xl">Forms list</h1>
                <Link href={route('add')}>
                    <Button className="cursor-pointer">
                        <Plus />
                        <span className="ml-2">Add form</span>
                    </Button>
                </Link>
            </div>

            <div className="px-4 pb-4">
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : (
                    <Table className="border rounded-lg">
                        <TableHeader className="bg-muted-foreground/30">
                            <TableRow className="hover:bg-transparent">
                                <TableHead>Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Action URL</TableHead>
                                <TableHead>Fields</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {forms.map((form) => (
                                <TableRow key={form.id}>
                                    <TableCell className="font-medium">{form.id}</TableCell>
                                    <TableCell className="font-medium">{form.name}</TableCell>
                                    <TableCell>{form.description}</TableCell>
                                    <TableCell>{form.action_url}</TableCell>
                                    <TableCell>
                                        <ul className="text-xs text-muted-foreground list-disc pl-4">
                                            {form.fields.map((field) => (
                                                <li key={field.id}>
                                                    <strong>{field.name}</strong> ({field.type})
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell className="h-full flex gap-2 justify-center items-center">
                                        <Link href={route('example', { id: form.id })}>
                                            <Eye className="cursor-pointer" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(form.id)}
                                            disabled={deleteLoading}
                                        >
                                            <Trash className="cursor-pointer" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            <Toaster />
        </main>
    );
}
