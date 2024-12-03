export interface Paquete {
nombre: any;
  precio: any;
  idPaquete?: string;             // ID del paquete (opcional)
  nombrePaquete?: string;         // Nombre del paquete
  descripcion?: string;           // Descripción del paquete
  categoria?: string;             // Categoría del paquete
  costo?: number;                 // Costo del paquete
  fechas?: string;                // Fechas del paquete
  fechaInicio?: string;           // Fecha de inicio del paquete
  fechaFin?: string;              // Fecha de fin del paquete
  duracion?: number;              // Duración en días
  maxParticipantes?: number;      // Número máximo de participantes
  estado?: 'activo' | 'inactivo'; // Estado del paquete (activo o inactivo)
  descuento?: number;             // Descuento aplicado
  popularidad?: number;           // Nivel de popularidad
  valoracion?: number;            // Valoración del paquete
  tipo?: string;                  // Tipo de paquete
  imageFile?: string;
  imageUrl?: string;              // URL de la imagen
}
