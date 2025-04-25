import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {TFormField} from "@/types/form";
import { toast } from "sonner"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Inertia } from '@inertiajs/inertia';
import { useCreateForm } from "@/hooks/useCreateForm";

const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().min(4),
    action_url: z.string().url(),
});

type FormSchemaType = z.infer<typeof formSchema>;

type Props = {
    fields: TFormField[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const CreateFormModal: React.FC<Props> = ({ fields, open, onOpenChange }) => {
    const { createForm, loading, error, successMessage } = useCreateForm();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            action_url: "",
        },
    });

    const onSubmit = async (values: FormSchemaType) => {
        const result = await createForm(values, fields);
        if (!error) {
            toast("Form has been created");
            form.reset();
            onOpenChange(false);
        } else {
            toast("Could not create a form");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nowy formularz</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwa formularza</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter form name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Opis</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter form description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="action_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Action URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="http://localhost:8000/api/forms/submit" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={loading} className="w-full flex items-center justify-center cursor-pointer">
                            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            {loading ? "Creating..." : "Save form"}
                        </Button>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateFormModal;
