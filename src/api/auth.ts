import type { User } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Tipos de respuesta
interface AuthResponse {
  user: User;
  token: string;
}

// Simular un pequeño delay para hacer más realista
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Login de usuario
 * Busca el usuario por email y verifica la contraseña
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  await delay(800); // Simular latencia de red

  try {
    // Buscar usuario por email
    const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }

    const users: User[] = await response.json();

    // Verificar si existe el usuario
    if (users.length === 0) {
      throw new Error('Email o contraseña incorrectos');
    }

    const user = users[0];

    // Verificar contraseña (en producción esto se haría en el backend)
    if (user.password !== password) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Actualizar lastLogin
    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    await fetch(`${API_URL}/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lastLogin: updatedUser.lastLogin }),
    });

    // Generar un token simulado (JWT)
    const token = generateMockToken(user.id);

    return {
      user: updatedUser,
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al iniciar sesión');
  }
}

/**
 * Registro de nuevo usuario
 * Verifica que el email no exista y crea el usuario
 */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  await delay(1000); // Simular latencia de red

  try {
    // Verificar si el email ya existe
    const existingResponse = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);

    if (!existingResponse.ok) {
      throw new Error('Error al conectar con el servidor');
    }

    const existingUsers: User[] = await existingResponse.json();

    if (existingUsers.length > 0) {
      throw new Error('Este email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser: Omit<User, 'id'> = {
      name,
      email,
      password, // En producción esto estaría hasheado
      role: 'user',
      avatar: null,
      addresses: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const createResponse = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!createResponse.ok) {
      throw new Error('Error al crear usuario');
    }

    const createdUser: User = await createResponse.json();

    // Generar token simulado
    const token = generateMockToken(createdUser.id);

    return {
      user: createdUser,
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al registrarse');
  }
}

/**
 * Recuperación de contraseña (simulada)
 * En producción enviaría un email real
 */
export async function recoverPassword(email: string): Promise<{ message: string }> {
  await delay(1500); // Simular latencia de red

  try {
    // Verificar si el email existe
    const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }

    const users: User[] = await response.json();

    if (users.length === 0) {
      // Por seguridad, no revelar si el email existe o no
      return {
        message: 'Si el email existe, recibirás instrucciones para recuperar tu contraseña',
      };
    }

    // Simular envío de email
    console.log(`📧 Email de recuperación enviado a: ${email}`);

    return {
      message: 'Si el email existe, recibirás instrucciones para recuperar tu contraseña',
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al solicitar recuperación');
  }
}

/**
 * Actualizar perfil de usuario
 */
export async function updateProfile(
  userId: string,
  data: Partial<Pick<User, 'name' | 'email' | 'avatar'>>
): Promise<User> {
  await delay(600);

  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar perfil');
    }

    const updatedUser: User = await response.json();
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al actualizar perfil');
  }
}

/**
 * Cambiar contraseña
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await delay(800);

  try {
    // Obtener usuario actual
    const response = await fetch(`${API_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario');
    }

    const user: User = await response.json();

    // Verificar contraseña actual
    if (user.password !== currentPassword) {
      throw new Error('La contraseña actual es incorrecta');
    }

    // Actualizar contraseña
    const updateResponse = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!updateResponse.ok) {
      throw new Error('Error al cambiar contraseña');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al cambiar contraseña');
  }
}

/**
 * Agregar nueva dirección
 */
export async function addAddress(userId: string, address: Omit<import('@/types').Address, 'id'>): Promise<User> {
  await delay(600);

  try {
    // Obtener usuario actual
    const response = await fetch(`${API_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario');
    }

    const user: User = await response.json();

    // Si es la única dirección o se marca como default, desmarcar otras
    const addresses = address.isDefault
      ? user.addresses.map((addr) => ({ ...addr, isDefault: false }))
      : user.addresses;

    // Agregar nueva dirección con ID único
    const newAddress: import('@/types').Address = {
      ...address,
      id: `addr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    const updatedAddresses = [...addresses, newAddress];

    // Actualizar usuario
    const updateResponse = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addresses: updatedAddresses }),
    });

    if (!updateResponse.ok) {
      throw new Error('Error al agregar dirección');
    }

    const updatedUser: User = await updateResponse.json();
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al agregar dirección');
  }
}

/**
 * Actualizar dirección existente
 */
export async function updateAddress(
  userId: string,
  addressId: string,
  address: Partial<Omit<import('@/types').Address, 'id'>>
): Promise<User> {
  await delay(600);

  try {
    // Obtener usuario actual
    const response = await fetch(`${API_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario');
    }

    const user: User = await response.json();

    // Buscar y actualizar la dirección
    const addressIndex = user.addresses.findIndex((addr) => addr.id === addressId);

    if (addressIndex === -1) {
      throw new Error('Dirección no encontrada');
    }

    // Si se marca como default, desmarcar otras
    let addresses = [...user.addresses];
    if (address.isDefault) {
      addresses = addresses.map((addr) => ({ ...addr, isDefault: false }));
    }

    // Actualizar la dirección específica
    addresses[addressIndex] = { ...addresses[addressIndex], ...address };

    // Actualizar usuario
    const updateResponse = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addresses }),
    });

    if (!updateResponse.ok) {
      throw new Error('Error al actualizar dirección');
    }

    const updatedUser: User = await updateResponse.json();
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al actualizar dirección');
  }
}

/**
 * Eliminar dirección
 */
export async function deleteAddress(userId: string, addressId: string): Promise<User> {
  await delay(600);

  try {
    // Obtener usuario actual
    const response = await fetch(`${API_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario');
    }

    const user: User = await response.json();

    // Filtrar la dirección a eliminar
    const updatedAddresses = user.addresses.filter((addr) => addr.id !== addressId);

    // Si se eliminó la dirección default y hay más, marcar la primera como default
    const hadDefault = user.addresses.find((addr) => addr.id === addressId)?.isDefault;
    if (hadDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    // Actualizar usuario
    const updateResponse = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addresses: updatedAddresses }),
    });

    if (!updateResponse.ok) {
      throw new Error('Error al eliminar dirección');
    }

    const updatedUser: User = await updateResponse.json();
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al eliminar dirección');
  }
}

/**
 * Generar un token JWT simulado (mock)
 * En producción esto se haría en el backend
 */
function generateMockToken(userId: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      userId,
      iat: Date.now(),
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días
    })
  );
  const signature = btoa('mock-signature-' + userId);

  return `${header}.${payload}.${signature}`;
}
