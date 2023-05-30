const API_URL = 'http://localhost:3001';

export async function getAllOutcomes() {
  const response = await fetch(`${API_URL}/outcomes`);
  return response.json();
}

export async function createOutcome(outcome) {
  const response = await fetch(`${API_URL}/outcomes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(outcome),
  });
  return response.json();
}

export async function updateOutcome(name, outcome) {
  const response = await fetch(`${API_URL}/outcomes/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(outcome),
  });
  return response.json();
}

export async function deleteOutcome(name) {
  const response = await fetch(`${API_URL}/outcomes/${name}`, {
    method: 'DELETE',
  });
  return response.json();
}

