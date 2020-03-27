import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mode:string='over';

  constructor() { }

  ngOnInit(): void {
    this.onResize();
  }

  onResize(){
    let sizeWindow=window.innerWidth;
    if(sizeWindow <=768){
        this.mode='over';
    }else{
      this.mode='side'
    }
    console.log(window.innerWidth)
  }
}
