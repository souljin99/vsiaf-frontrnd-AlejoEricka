import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OficinaService } from '@core/services/oficina.service';
import { OficinaResponse } from '@features/oficinas/models/oficina.model';

type Modo = 'ver' | 'nuevo' | 'editar';

@Component({
  selector: 'app-oficinas-responsables',
  imports: [FormsModule],
  templateUrl: './oficinas-responsables.html',
  styleUrl: './oficinas-responsables.scss',
})
export class OficinasResponsables implements OnInit {
  private svc = inject(OficinaService);

  oficinas = signal<OficinaResponse[]>([]);
  seleccionada = signal<OficinaResponse | null>(null);
  modo = signal<Modo>('ver');
  cargando = signal(false);
  mensaje = signal('');
  esError = signal(false);

  nombre = '';
  observacion = '';

  editando = computed(() => this.modo() !== 'ver');

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.svc.listar().subscribe({
      next: (d) => {
        this.oficinas.set(d);
        this.cargando.set(false);
      },
      error: () => {
        this.aviso('No se pudo cargar (si es la primera vez, Render puede tardar ~1 min en despertar)', true);
        this.cargando.set(false);
      },
    });
  }

  seleccionar(o: OficinaResponse) {
    if (this.editando()) return;
    this.seleccionada.set(o);
    this.nombre = o.nombre;
    this.observacion = o.observacion ?? '';
  }

  nuevo() {
    this.seleccionada.set(null);
    this.nombre = '';
    this.observacion = '';
    this.modo.set('nuevo');
  }

  modificar() {
    if (this.seleccionada()) this.modo.set('editar');
  }

  cancelar() {
    this.modo.set('ver');
    const s = this.seleccionada();
    this.nombre = s?.nombre ?? '';
    this.observacion = s?.observacion ?? '';
  }

  guardar() {
    const body = { nombre: this.nombre.trim(), observacion: this.observacion.trim() };
    if (!body.nombre) return this.aviso('El nombre es obligatorio', true);
    if (body.nombre.length > 65) return this.aviso('El nombre admite máximo 65 caracteres', true);

    const s = this.seleccionada();
    const req =
      this.modo() === 'editar' && s
        ? this.svc.modificar(s.codOfic, body)
        : this.svc.crear(body);

    req.subscribe({
      next: (r) => {
        this.aviso('Guardado correctamente', false);
        this.modo.set('ver');
        this.seleccionada.set(r);
        this.cargar();
      },
      error: () => this.aviso('No se pudo guardar (¿nombre repetido?)', true),
    });
  }

  alternarEstado() {
    const s = this.seleccionada();
    if (!s) return;
    this.svc.cambiarEstado(s.codOfic, !s.activo).subscribe({
      next: (r) => {
        this.seleccionada.set(r);
        this.cargar();
        this.aviso(r.activo ? 'Oficina activada' : 'Oficina inactivada', false);
      },
      error: () => this.aviso('No se pudo cambiar el estado', true),
    });
  }

  private aviso(m: string, error: boolean) {
    this.mensaje.set(m);
    this.esError.set(error);
  }
}