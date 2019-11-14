import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprovee',
  templateUrl: './editprovee.component.html',
  styleUrls: ['./editprovee.component.css']
})
export class EditproveeComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor: any;
  nombre: any;
  cif: any;
  direccion: any;
  cp: any;
  localidad: any;
  provincia: any;
  telefono: any;
  email: any;
  contacto: any;
  id: string;
  provincias: string[] = ['Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
    'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares',
    'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
    'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife',
    'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'];

  constructor(private pf: FormBuilder,
    private proveedorService: ProveedoresService, private router: Router,
    private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params
      .subscribe(parametros => {
        this.id = parametros['id'];
        this.proveedorService.getProveedor(this.id)
          .subscribe(proveedor => this.proveedor = proveedor)
      });
  }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', Validators.required],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      contacto: ['', Validators.required],
    });
    this.onChanges();
  }

  onChanges(): void {
    this.proveedorForm.valueChanges.subscribe(valor => {
      this.nombre = valor.nombre;
      this.cif = valor.cif;
      this.direccion = valor.direccion;
      this.cp = valor.cp;
      this.localidad = valor.nombre;
      this.provincia = valor.provincia;
      this.telefono = valor.telefono;
      this.email = valor.email;
      this.contacto = valor.contacto;
    });
  }

  onSubmit() {
    this.proveedor = this.saveProveedor(); this.proveedorService.putProveedor(this.proveedor, this.id)
      .subscribe(newpre => {
        this.router.navigate(['/proveedores'])
      })
  }

  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }

}
