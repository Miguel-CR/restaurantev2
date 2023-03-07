import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto/producto-index/producto-index.component';
import { ProductoCreateComponent } from './producto/producto-create/producto-create.component';
import { LoginIndexComponent } from './login/login-index/login-index.component';

const routes: Routes = [
  {
    path: '',
    component: LoginIndexComponent,
    redirectTo: '',
    pathMatch: 'full',
  },
  // {
  //   path: '/producto/create',
  //   component: ProductoCreateComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
