import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private route: ActivatedRoute, public productoService: ProductosService ) { }

  ngOnInit(): void {

    this.route.params.subscribe( params => {
      // console.log(params['termino']);
      // tslint:disable-next-line: no-string-literal
      this.productoService.buscarProducto(params['termino']);
    });

  }

}
