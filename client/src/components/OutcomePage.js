import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSingleOutcome from './useSingleOutcome';
import OutcomeDetails from './OutcomeDetails';
import useOutcomes from './UseOutcomes';

function OutcomePage() {
    const { id } = useParams();
    const { outcome, loading, error } = useSingleOutcome(id);
    const navigate = useNavigate();
    const {handleDeleteOutcome} = useOutcomes();
    
    const onDelete = () => {
        try {
            handleDeleteOutcome(id); 
            navigate(-1); 
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="outcome-details-container">
            <OutcomeDetails outcome={outcome} />
            <div className="button-container">
                <button className="action-button" onClick={() => navigate(-1)}>Go back</button>
                <button className="action-delete" onClick={onDelete}>Delete Outcome</button>
            </div>
        </div>
    );
}

export default OutcomePage;
