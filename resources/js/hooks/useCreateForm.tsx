import { useState } from "react";
import axios from "axios";
import {TFormData, TFormField} from "@/types/form";


export type TCreateFormResult = {
    message: string;
    form_id: number;
}

export const useCreateForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const createForm = async (formData: TFormData, fields: TFormField[]) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const formRes = await axios.post<TCreateFormResult>(
                "http://localhost:8000/api/forms",
                formData
            );

            const { form_id, message } = formRes.data;

            const fieldsWithOrder = fields.map((field, index) => ({
                ...field,
                order: index + 1,
            }));

            await axios.post(
                `http://localhost:8000/api/forms/${form_id}/fields`,
                { fields: fieldsWithOrder }
            );

            setSuccessMessage(message);
        } catch (err: any) {
            setError(err.response?.data?.message || "Wystąpił błąd przy tworzeniu formularza.");
        } finally {
            setLoading(false);
        }
    };

    return {
        createForm,
        loading,
        error,
        successMessage,
    };
};
