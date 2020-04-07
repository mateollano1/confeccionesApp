import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css']
})
export class ShowInventoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("saludos desde inventario");
    
  }

}
