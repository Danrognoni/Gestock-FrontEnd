
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ExistenciaComponent } from './pages/existencia/existencia.component';
import { DescuentoComponent } from './pages/descuento/descuento.component';


export const routes: Routes = [
  {path :'', component:HomeComponent},
  { path: 'productos', component:ProductoComponent },
   { path: 'proveedores', component:ProveedorComponent },
   { path: 'existencia', component:ExistenciaComponent },
   {path:'descuento', component:DescuentoComponent}
];
