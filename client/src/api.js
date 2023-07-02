const API_URL = process.env.REACT_APP_API_URL;

export async function loginUser(email, password) {
  console.log(API_URL);
  console.log(API_URL);
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }), 
  });
  return response.json();
}
 

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

export async function bulkOutcomes(outcomes) {
  const response = await fetch(`${API_URL}/outcomes/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(outcomes),
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

