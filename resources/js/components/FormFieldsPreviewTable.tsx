import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUp, ArrowDown, Trash } from "lucide-react"
import { TFormField } from "@/pages/addForm";

type FormFieldsTableProps = {
    fields: TFormField[];
    onRemove: (index: number) => void;
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
};

export default function FormFieldsTable({ fields, onRemove, onMoveUp, onMoveDown }: FormFieldsTableProps) {
    if (fields.length === 0) return <p className="self-center text-muted-foreground">No fields added yet.</p>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{field.type}</TableCell>
                        <TableCell>{field.name}</TableCell>
                        <TableCell>{field.class}</TableCell>
                        <TableCell>{field.required ? "Yes" : "No"}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => onMoveUp(index)} disabled={index === 0}>
                                <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => onMoveDown(index)} disabled={index === fields.length - 1}>
                                <ArrowDown className="w-4 h-4" />
                            </Button>
                            <Button className="cursor-pointer" variant="destructive" size="icon" onClick={() => onRemove(index)}>
                                <Trash className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
