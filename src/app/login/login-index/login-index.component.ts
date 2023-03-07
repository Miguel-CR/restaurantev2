import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css'],
})
export class LoginIndexComponent implements OnInit {
  constructor(private router: Router) {}

  onInicio() {
    this.router.navigate(['producto/']);
  }

  ngOnInit(): void {}
}
