export interface OficinaRequest {
  nombre: string;        // requerido, máx. 65 caracteres
  observacion?: string;  // máx. 255 caracteres
}

export interface OficinaResponse {
  codOfic: number;
  nombre: string;
  observacion: string;
  entidad: number;
  unidad: string;
  activo: boolean;
}

export interface EstadoRequest {
  activo: boolean;
}