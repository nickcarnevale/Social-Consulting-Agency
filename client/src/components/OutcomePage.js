import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSingleOutcome from './useSingleOutcome';
import OutcomeDetails from './OutcomeDetails';

function OutcomePage() {
    const { id } = useParams();
    const { outcome, loading, error } = useSingleOutcome(id);
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <OutcomeDetails outcome={outcome} />
            <button onClick={() => navigate(-1)}>Go back</button>
        </div>
    );
}

export default OutcomePage;
