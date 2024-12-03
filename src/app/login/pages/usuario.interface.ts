export interface Usuario {
    idUsuario: number;
    apellidoUsuario: string;
    nombreUsuario: string;
    correoUsuario?: string;
    telefonoUsuario?: number;
    confirmPassword: string;
}
