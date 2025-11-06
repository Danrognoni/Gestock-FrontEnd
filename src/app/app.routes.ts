import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProveedorComponent } from './pages/proveedor-list/proveedor.component';
import { ExistenciaComponent } from './pages/existencia-list/existencia.component';
import { DescuentoComponent } from './pages/descuento-list/descuento.component';


import { ProductoNavComponent } from './components/producto-nav/producto-nav.component';
import { ProductoComponent } from './pages/producto-list/producto.component';
import { ProductoFormComponent } from './pages/producto-form/producto-form.component';
import { ExistenciaFormComponent } from './pages/existencia-form/existencia-form.component';
import { ProveedorFormComponent } from './pages/proveedor-form/proveedor-form.component';
import { ExistenciaNavComponent } from './components/existencia-nav/existencia-nav.component';
import { ProveedorNavComponent } from './components/proveedor-nav/proveedor-nav.component';
import { DescuentoNavComponent } from './components/descuento-nav/descuento-nav.component';
import { DescuentoFormComponent } from './pages/descuento-form/descuento-form.component';


export const routes: Routes = [

  { path: '', component: HomeComponent },


  {
    path: 'productos',
    component: ProductoNavComponent,
    children: [
      {
        path: 'productoList',
        component: ProductoComponent
      },
      {
        path: 'createProducto',
        component: ProductoFormComponent
      }
    ]
  },

  { path: 'proveedores', component: ProveedorNavComponent,
    children : [
      {
        path : 'proveedorList', component : ProveedorComponent
      },
      {
        path : 'createProveedor', component : ProveedorFormComponent
      }
    ]
  },

  { path: 'existencia', component: ExistenciaNavComponent,
    children : [
      {
        path : 'existenciaList', component : ExistenciaComponent
      },
      {
        path : 'createExistencia', component : ExistenciaFormComponent
      }
    ]
  },
  { path: 'descuento', component: DescuentoNavComponent,
    children : [
      {
        path : 'descuentoList', component:DescuentoComponent
      },
      {
        path : 'createDescuento', component:DescuentoFormComponent
      }
    ]
   }

,
  {path :'', component:HomeComponent},

];
