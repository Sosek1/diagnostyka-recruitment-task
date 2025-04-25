export type TFormField = {
    type: "text" | "email" | "textarea" | "button";
    name: string;
    class: string;
    required: boolean;
    order: number;
}

export type TFormData = {
    name: string;
    description: string;
    action_url: string;
}
