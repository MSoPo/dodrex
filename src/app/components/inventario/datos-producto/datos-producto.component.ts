import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-datos-producto',
  templateUrl: './datos-producto.component.html',
  styleUrls: ['./datos-producto.component.scss']
})
export class DatosProductoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public producto: Producto) { }

  ngOnInit(): void {
  }

}
