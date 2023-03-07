import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';

const productoRoutes: Routes = [
  { path: 'producto', component: ProductoIndexComponent },
  { path: 'producto/create', component: ProductoCreateComponent },
  { path: 'producto/update/:id', component: ProductoUpdateComponent },
];

@NgModule({
  declarations: [
    ProductoCreateComponent,
    ProductoIndexComponent,
    ProductoShowComponent,
    ProductoUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productoRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class ProductoModule {}
