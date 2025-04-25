import { useEffect, useState } from "react";
import { TFormField, TFormData } from "@/types/form";



export type Form = {
    id: number;
    name: string;
    description: string;
    action_url: string;
    fields: TFormField[];
};

export function useFetchForms() {
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/forms");
                if (!res.ok) throw new Error("Failed to fetch forms");
                const data = await res.json();
                setForms(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, []);

    return { forms, loading, error };
}
