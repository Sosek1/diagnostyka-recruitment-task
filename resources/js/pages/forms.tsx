import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { usePage } from "@inertiajs/react";
import { NavItem, SharedData } from "@/types";
import {Plus, LayoutGrid} from "lucide-react";
import { Button } from "@/components/ui/button"

const mainNavItems: NavItem[] = [
    {
        title: 'Forms',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

export default function Forms() {
    const page = usePage<SharedData>();

    return (
        <main className="w-full h-full flex flex-col">
            <div className="w-full p-4 flex justify-between">
                <h1 className="text-2xl">Forms list</h1>
                <Button className="cursor-pointer">
                    <Plus />
                    <span>Add form</span>
                </Button>
            </div>
            <div className="p-4">
                <Table className="border rounded-lg">
                    <TableHeader className="bg-muted-foreground/30">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
    </main>
    )
}
