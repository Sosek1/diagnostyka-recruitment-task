import { useEffect } from "react";
export default function Example() {
    useEffect(() => {
        fetch('http://localhost:8000/api/forms/8/rendered')
            .then(res => res.text())
            .then(html => {
                document.getElementById('form-container').innerHTML = html;
            });
    }, []);

    return (
        <div id="form-container" className="w-screen h-screen flex items-center justify-center"></div>
    )
}
