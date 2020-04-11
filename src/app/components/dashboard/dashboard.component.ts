import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  inventarioColor: string = ""
  maquinaColor: string = ""
  proveedorColor: string = ""
  trabajadorColor: string = ""
  reporteColor: string = ""

  mode: string = 'over';

  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }
  changeColor(index: number) {
    this.clearColor()
    console.log(index);
    switch (index) {
      case 0:
this.inventarioColor = "#F58F0D"
        break;
      case 1:
this.maquinaColor = "#F58F0D"
        break;
      case 2:
this.proveedorColor = "#F58F0D"
        break;
      case 3:
this.trabajadorColor = "#F58F0D"
        break;
      case 4:
this.reporteColor = "#F58F0D"
        break;

      default:
        break;
    }


  }
  clearColor() {
    this.inventarioColor = "#66615b"
    this.maquinaColor = "#66615b"
    this.proveedorColor = "#66615b"
    this.trabajadorColor = "#66615b"
    this.reporteColor = "#66615b"
  }
  onResize() {
    let sizeWindow = window.innerWidth;
    if (sizeWindow <= 768) {
      this.mode = 'over';
    } else {
      this.mode = 'side'
    }
    console.log(window.innerWidth)
  }
}
