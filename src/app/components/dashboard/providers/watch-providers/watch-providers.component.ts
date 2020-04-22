import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../../models/provider';
import { ProvidersService } from '../../../../services/providers.service';
import { log } from 'util';

@Component({
  selector: 'app-watch-providers',
  templateUrl: './watch-providers.component.html',
  styleUrls: ['./watch-providers.component.css']
})
export class WatchProvidersComponent implements OnInit {

  loading: boolean = true
  provs: Provider[]
  constructor(private providerService: ProvidersService) { }
  
  ngOnInit(): void {
    this.getProviders()
  }

  getProviders(){
    this.providerService.getProviders().subscribe(data =>{
      console.log(data);
      
    })
  }

}
