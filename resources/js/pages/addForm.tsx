import { useState } from "react";
import BuildFieldForm from "@/components/BuildFieldForm";
import FormFieldsPreviewTable from "@/components/FormFieldsPreviewTable";
import { Button } from "@/components/ui/button"
import { TFormField } from "@/types/form";
import CreateFormModal from "@/components/BuildFormModal";
import {Toaster} from "@/components/ui/sonner";
import * as React from "react";
import { toast } from "sonner"

export default function Forms() {
    const [formFields, setFormFields] = useState<TFormField[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemove = (index: number) => {
        setFormFields((prev) => prev.filter((_, i) => i !== index));
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        setFormFields((prev) => {
            const updated = [...prev];
            [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
            return updated;
        });
    };

    const handleMoveDown = (index: number) => {
        if (index === formFields.length - 1) return;
        setFormFields((prev) => {
            const updated = [...prev];
            [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
            return updated;
        });
    };

    const onAddFormFieldsHandler = (formField: TFormField) => {
        if (formField.type === "button") {
            const alreadyHasButton = formFields.some(field => field.type === "button");
            if (alreadyHasButton) {
                toast("Just one button can be added to form",);
                return;
            }
        }
        setFormFields((prev) => [...prev, formField]);
    }

    const handleCreateForm = () => {
        const hasButton = formFields.some(field => field.type === "button");

        if (!hasButton) {
            toast("Form must include field with button type");
            return;
        }

        setIsModalOpen(true);
    }

    return(
        <>
            <main className="p-4 w-full h-full flex flex-col">
                <h1 className="text-2xl mb-4 ">Build form</h1>
                <div className="w-full flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2 p-4 flex flex-col gap-3 border border-muted-foreground/30 rounded-md">
                        <h2 className="text-xl">Build your form field</h2>
                        <BuildFieldForm  onAdd={onAddFormFieldsHandler}/>
                    </div>
                    <div className="md:w-1/2 p-4 flex flex-col gap-3 border border-muted-foreground/30 rounded-md">
                        <h2 className="text-xl">Preview and manage form fields</h2>
                        <div className="h-full flex flex-col justify-between gap-2">
                            <FormFieldsPreviewTable
                                fields={formFields}
                                onRemove={handleRemove}
                                onMoveUp={handleMoveUp}
                                onMoveDown={handleMoveDown}
                            />
                            {formFields.length > 0 && <Button className="w-fit cursor-pointer" onClick={handleCreateForm}>Create form</Button>}
                        </div>
                    </div>
                </div>
                <CreateFormModal fields={formFields} open={isModalOpen} onOpenChange={setIsModalOpen} />
            </main>
        <Toaster />
    </>
    )
}
