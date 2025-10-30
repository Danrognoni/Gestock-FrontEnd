export type UserRole = 'ADMINISTRADOR' | 'EMPLEADO' | null;

export interface Usuario {
  id: number;
  username: string;
  password?: string;
  rol: UserRole;
}
