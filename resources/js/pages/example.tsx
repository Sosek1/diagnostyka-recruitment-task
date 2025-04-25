import { useEffect } from "react";
export default function Example() {
    useEffect(() => {
        fetch('http://localhost:8000/api/forms/1/rendered')
            .then(res => res.text())
            .then(html => {
                console.log(html)
                document.getElementById('form-container').innerHTML = html;
            });
    }, []);

    return (
        <div id="form-container" className="w-screen h-screen flex items-center justify-center"></div>
    )
}
