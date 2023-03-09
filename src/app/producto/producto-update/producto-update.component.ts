import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria.model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css'],
})
export class ProductoUpdateComponent implements OnInit {
  constructor(
    private productosService: ProductosService,
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // const id = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.getProducto(parseInt(id));
        }
      },
    });
  }
  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl(''),
    precio: new FormControl(''),
    descuento: new FormControl(''),
    categoriaId: new FormControl(''),
    // imagen: new FormControl(''),
  });
  categoriasList: Categoria[] = [];
  List: any[] = [];
  error: any;
  makeSubmit: boolean = false;
  producto: Producto = {
    id: 0,
    nombre: '',
    detalle: '',
    precio: 0,
    descuento: false,
    categoriaId: 1,
    imagen: '',
  };

  reactiveForm() {
    if (this.producto) {
      this.form = this.formBuilder.group({
        nombre: [
          this.producto.nombre,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(70),
          ],
        ],
        detalle: [
          this.producto.detalle,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(70),
          ],
        ],
        precio: [this.producto.precio, Validators.required],
        descuento: [this.producto.descuento, [Validators.required]],
        categoriaId: [this.producto.categoriaId, Validators.required],
      });
    }
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

  updateResponse(p: Producto) {
    this.productosService.updateProducto(p).subscribe({
      next: (response) => {
        console.log(response + 'xd');
        this.onBack();
      },
    });
  }

  getProducto(id: number) {
    this.productosService.getProductoById(id).subscribe({
      next: (response) => {
        this.producto = response;
        for (const key in response) {
          console.log(key);
          // console.log(key.nombre);
          // console.log(key.detalle);
          // console.log(key.precio);
          // console.log(key.descuento);
          // console.log(key.categoriaId);
        }
      },
    });
    this.reactiveForm();
  }

  onSubmit(): void {
    console.log(JSON.stringify(this.form.value, null, 2));
    this.List.push(this.form.value);
    this.List.forEach((element) => {
      this.producto.nombre = element.nombre;
      this.producto.detalle = element.detalle;
      this.producto.precio = element.precio;
      this.producto.descuento = element.descuento;
      this.producto.categoriaId = element.categoriaId;
    });
    if (this.form.invalid) {
      return;
    }
    this.makeSubmit = true;

    this.updateResponse(this.producto);
  }

  onReset(): void {
    this.makeSubmit = false;
    this.form.reset();
  }

  onBack() {
    this.onReset();
    this.router.navigate(['producto/']);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.form.controls[control].hasError(error) &&
      this.form.controls[control].invalid &&
      (this.makeSubmit || this.form.controls[control].touched)
    );
  };
}
