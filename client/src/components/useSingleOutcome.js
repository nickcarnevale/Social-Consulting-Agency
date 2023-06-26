import { useState, useEffect } from 'react';
const API_URL = process.env.REACT_APP_API_URL;


export default function useSingleOutcome(id) {
    const [outcome, setOutcome] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/outcomes/${id}`)
            .then(response => response.json())
            .then(data => {
                setOutcome(data);
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    return { outcome, loading };
}
