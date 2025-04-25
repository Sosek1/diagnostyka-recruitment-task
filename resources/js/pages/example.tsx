import { useEffect, useState } from "react";

export default function Example({ formId }) {
    const [formHtml, setFormHtml] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:8000/api/forms/${formId}/rendered`)
            .then((res) => res.text())
            .then((html) => {
                setFormHtml(html);
            });
    }, [formId]);

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div id="form-container" dangerouslySetInnerHTML={{ __html: formHtml }}></div>
        </div>
    );
}
