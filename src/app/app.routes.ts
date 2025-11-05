

import { Routes } from '@angular/router';
import { ProductoComponent } from './pages/producto-list/producto.component';
import { HomeComponent } from './pages/home/home.component';
import { ProveedorComponent } from './pages/proveedor-list/proveedor.component';
import { ExistenciaComponent } from './pages/existencia-list/existencia.component';
import { DescuentoComponent } from './pages/descuento-list/descuento.component';
import { ProductoFormComponent } from './pages/producto-form/producto-form.component';
import { ExistenciaFormComponent } from './pages/existencia-form/existencia-form.component';
import { ProveedorFormComponent } from './pages/proveedor-form/proveedor-form.component';


export const routes: Routes = [
  {path :'', component:HomeComponent},
  { path: 'productos', component:ProductoComponent },
  {path : 'createProducto', component:ProductoFormComponent},
   { path: 'proveedor', component:ProveedorComponent },
   {path:'proveedor/create', component:ProveedorFormComponent},
   { path: 'existencia', component:ExistenciaComponent },
   { path: 'createExistencia', component: ExistenciaFormComponent},
   {path:'descuento', component:DescuentoComponent}
];
