import { useState, useEffect } from 'react';

export default function useSingleOutcome(id) {
    const [outcome, setOutcome] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/outcomes/${id}`)
            .then(response => response.json())
            .then(data => {
                setOutcome(data);
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    return { outcome, loading };
}
