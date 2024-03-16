import { useEffect, useState } from "react";


interface RequestOptions {
  url: string;
}


export default function useFetch<T>({ url }: RequestOptions) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8000/${url}`).then(
            resp => resp.json()
        ).then(data => setData(data)).catch((error => setError(error)))
    }, [url])

    return { data, error }

}