export type UserRole = 'ADMINISTRADOR' | 'EMPLEADO' | null;

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  username: string;
  password?: string;
  rol: UserRole;
}
