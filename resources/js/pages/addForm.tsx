import { useEffect, useState } from "react";
import  BuildFieldForm from "@/components/BuildFieldForm"

type TFormField = {
    type: "text" | "email" | "textarea" | "button";
    name: string;
    class: string;
    required: boolean;
};

export default function Forms() {
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        console.log(formFields)
    }, [formFields])
    return(
        <main className="p-4 w-full h-full flex flex-col">
            <h1 className="text-2xl mb-4 ">Build form</h1>
            <div className="w-full flex gap-8">
                <div className="w-1/2 p-4 flex flex-col gap-3 border border-muted-foreground/30 rounded-md">
                    <h2 className="text-xl">Build your form field</h2>
                    <BuildFieldForm onAdd={(formField) => setFormFields((prev) => [...prev, formField])}/>
                </div>
                <div className="w-1/2 p-4 flex flex-col gap-3 border border-muted-foreground/30 rounded-md">
                    <h2 className="text-xl">Preview and manage form fields</h2>

                </div>
            </div>
        </main>
    )
}
