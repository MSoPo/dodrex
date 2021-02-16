import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-guess',
  templateUrl: './layout-guess.component.html',
  styleUrls: ['./layout-guess.component.scss']
})
export class LayoutGuessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/ventas']);
  }

}
