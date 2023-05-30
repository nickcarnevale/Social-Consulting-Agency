export function deleteOutcome(id) {
    return fetch(`http://localhost:3001/outcomes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete outcome');
        }
        console.log('Outcome deleted successfully');
        return response;  // add this line
      })
      .catch((error) => {
        console.error('Error deleting outcome:', error);
        throw error;
      });
}
  