import { adminGuard } from './auth/guards/adminGuard';
import { Routes } from '@angular/router';

// Componentes Públicos y de Navegación
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

// Componentes de "Productos"
import { ProductoNavComponent } from './components/producto-nav/producto-nav.component';
import { ProductoComponent } from './pages/producto-list/producto.component';
import { ProductoFormComponent } from './pages/producto-form/producto-form.component';
import { ProductoDetailComponent } from './pages/producto-detail/producto-detail.component';

// Componentes de "Proveedores"
import { ProveedorNavComponent } from './components/proveedor-nav/proveedor-nav.component';
import { ProveedorComponent } from './pages/proveedor-list/proveedor.component';
import { ProveedorFormComponent } from './pages/proveedor-form/proveedor-form.component';
import { ProveedorDetailComponent } from './pages/proveedor-detail/proveedor-detail.component';

// Componentes de "Existencia"
import { ExistenciaNavComponent } from './components/existencia-nav/existencia-nav.component';
import { ExistenciaComponent } from './pages/existencia-list/existencia.component';
import { ExistenciaFormComponent } from './pages/existencia-form/existencia-form.component';
import { ExistenciaDetailComponent } from './pages/existencia-detail/existencia-detail.component';

// Componentes de "Descuento"
import { DescuentoNavComponent } from './components/descuento-nav/descuento-nav.component';
import { DescuentoComponent } from './pages/descuento-list/descuento.component';
import { DescuentoFormComponent } from './pages/descuento-form/descuento-form.component';

// Componentes de "Guards"
import { authGuardFnLogin } from './auth/guards/authGuardFnLogin';
import { AuthGuardFnComponent } from './auth/guards/auth.guard.fn.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuardFnLogin]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },

  {
    path: 'productos',
    component: ProductoNavComponent,

    canActivate: [AuthGuardFnComponent],
    children: [
      { path: '', redirectTo: 'productoList', pathMatch: 'full' },
      { path: 'productoList', component: ProductoComponent },
      { path: 'createProducto', component: ProductoFormComponent },
      {path:'editProducto/:id', component:ProductoFormComponent},
      { path: 'productoDetail/:id', component: ProductoDetailComponent }
    ]
  },

  {
    path: 'proveedores',
    component: ProveedorNavComponent,
    canActivate: [AuthGuardFnComponent, adminGuard],
    children: [
      { path: '', redirectTo: 'proveedorList', pathMatch: 'full' },
      { path: 'proveedorList', component: ProveedorComponent },
      { path: 'createProveedor', component: ProveedorFormComponent },
      { path: 'proveedorDetail/:id', component: ProveedorDetailComponent }
    ]
  },

  {
    path: 'descuento',
    component: DescuentoNavComponent,
    canActivate: [AuthGuardFnComponent, adminGuard],
    children: [
      { path: '', redirectTo: 'descuentoList', pathMatch: 'full' },
      { path: 'descuentoList', component: DescuentoComponent },
      { path: 'createDescuento', component: DescuentoFormComponent },
      { path: 'editDescuento/:id', component: DescuentoFormComponent }
    ]
  },

  {
    path: 'existencia',
    component: ExistenciaNavComponent,
    canActivate: [AuthGuardFnComponent],
    children: [
      { path: '', redirectTo: 'existenciaList', pathMatch: 'full' },
      { path: 'existenciaList', component: ExistenciaComponent },
      { path: 'createExistencia', component: ExistenciaFormComponent },
      {path : 'editExistencia/:id', component:ExistenciaFormComponent},
      { path: 'existenciaDetail/:id', component: ExistenciaDetailComponent }
    ]
  },

  { path: '**', redirectTo: 'home' }
];
