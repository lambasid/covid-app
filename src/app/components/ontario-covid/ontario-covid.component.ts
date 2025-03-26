import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-ontario-covid',
  templateUrl: './ontario-covid.component.html',
  styleUrls: ['./ontario-covid.component.scss'],
  standalone: false,
})
export class OntarioCovidComponent implements OnInit {
  ontarioData: any = {};
  loading = true;
  error = false;

  constructor(private covidService: CovidService) { }

  ngOnInit() {
    this.loadOntarioData();
  }

  loadOntarioData() {
    this.loading = true;
    this.error = false;
    
    this.covidService.getOntarioStatusData().subscribe({
      next: (data) => {
        this.ontarioData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Ontario data:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  refresh() {
    this.loadOntarioData();
  }
}
