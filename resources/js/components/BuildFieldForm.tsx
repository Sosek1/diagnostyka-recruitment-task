import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    type: z.enum(["text", "email", "textarea", "button"]),
    name: z.string().min(4).max(50),
    class: z.string().optional(),
    required: z.boolean(),
})

type TFormField = z.infer<typeof formSchema>;

type TBuildFieldFormProps = {
    onAdd: (FormField: TFormField) => void;
}
export default function BuildFieldForm({onAdd} : TBuildFieldFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "text",
            name: "",
            class: "",
            required: true,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        onAdd(values);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Field type</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select input type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">Text</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="textarea">Textarea</SelectItem>
                                        <SelectItem value="button">Button</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Field name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter input name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Field class</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter input class name" {...field} />
                            </FormControl>
                            <FormDescription>Provide tailwind class names which let's you apply your own styles for each input field</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Field requirement</FormLabel>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>Specify weather field is required or not</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="cursor-pointer">Add field</Button>
            </form>
        </Form>
    )
}
