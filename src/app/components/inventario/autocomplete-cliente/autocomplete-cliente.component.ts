import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-autocomplete-cliente',
  templateUrl: './autocomplete-cliente.component.html',
  styleUrls: ['./autocomplete-cliente.component.scss']
})
export class AutocompleteClienteComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
}
