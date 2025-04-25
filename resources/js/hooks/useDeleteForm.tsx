import { useState } from "react";
import { toast } from "sonner";

export function useDeleteForm(refetch) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteForm = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8000/api/forms/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Failed to delete form.");
            }

            if (refetch) {
                refetch();
            }

            toast("Form has been deleted");
        } catch (err) {
            setError(err.message);
            toast("Error deleting form: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteForm, loading, error };
}
