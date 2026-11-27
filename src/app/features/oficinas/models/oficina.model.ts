export interface OficinaRequest {
  nombre: string;        // NOMOFIC, máx. 65
  observacion?: string;  // OBSERV, máx. 255
}

export interface OficinaResponse {
  codOfic: number;
  nombre: string;
  observacion: string;
  entidad: number;
  unidad: string;
  activo: boolean;
  // FEULT y USUAR del DBF: opcionales hasta que el backend los exponga.
  // Los nombres son una suposición: confirmarlos con quien hace el backend.
  fechaUltimaModificacion?: string;
  usuario?: string;
}

export interface EstadoRequest {
  activo: boolean;
}