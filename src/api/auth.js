export async function authenticate(email, password) {
  const BASE_URL = 'http://173.254.242.213:3000';
  try {
    // Realizamos una solicitud POST a la API con la URL y los datos de correo y contraseña proporcionados
    const response = await fetch(`${BASE_URL}/auth/signin-internal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Verificamos si la respuesta de la API indica un error
    if (!response.ok) {
      throw new Error('Authentication failed.');
    }

    // Parseamos los datos de la respuesta como JSON
    const data = await response.json();

    // Retornamos los datos obtenidos de la respuesta
    return data;
  } catch (error) {
    // Capturamos cualquier error que ocurra durante la autenticación y lanzamos una nueva excepción
    throw new Error('An error occurred during authentication.');
  }
}
