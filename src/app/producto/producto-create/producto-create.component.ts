import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria.model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css'],
})
export class ProductoCreateComponent implements OnInit {
  constructor(
    private productosService: ProductosService,
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private router: Router
  ) {
    this.reactiveForm();
  }
  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl(''),
    precio: new FormControl(''),
    descuento: new FormControl(''),
    categoriaId: new FormControl(''),
    imagen: new FormControl(''),
  });
  categoriasList: Categoria[] = [];
  List: any[] = [];
  error: any;
  makeSubmit: boolean = false;
  createProducto: Producto = {
    id: 0,
    nombre: '',
    detalle: '',
    precio: 0,
    descuento: false,
    categoriaId: 1,
    imagen: '',
  };

  reactiveForm() {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(70),
        ],
      ],
      detalle: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(70),
        ],
      ],
      precio: [0, Validators.required],
      descuento: [false, [Validators.required]],
      categoriaId: [0, Validators.required],
    });
    this.getCategorias();
  }

  getCategorias() {
    this.categoriasService.getAllCategorias().subscribe({
      next: (categorias) => {
        this.categoriasList = categorias;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  addPruductoRequets(p: Producto) {
    this.productosService.createProducto(p).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
  onSubmit(): void {
    console.log(JSON.stringify(this.form.value, null, 2));
    this.List.push(this.form.value);

    this.List.forEach((element) => {
      this.createProducto.nombre = element.nombre;
      this.createProducto.detalle = element.detalle;
      this.createProducto.precio = element.precio;
      this.createProducto.descuento = element.descuento;
      this.createProducto.categoriaId = element.categoriaId;
    });
    this.makeSubmit = true;

    if (this.form.invalid) {
      return;
    }
    this.addPruductoRequets(this.createProducto);
    this.onBack();
  }

  onReset(): void {
    this.makeSubmit = false;
    this.form.reset();
  }

  onBack() {
    this.onReset();
    this.router.navigate(['producto/']);
  }
  // onFileSelect($event:Event) {
  //   const file = ($event.target as HTMLInputElement).files[0];
  // }

  // cover

  public errorHandling = (control: string, error: string) => {
    return (
      this.form.controls[control].hasError(error) &&
      this.form.controls[control].invalid &&
      (this.makeSubmit || this.form.controls[control].touched)
    );
  };
}
