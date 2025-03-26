import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-canada-covid',
  templateUrl: './canada-covid.component.html',
  styleUrls: ['./canada-covid.component.scss'],
  standalone: false,
})
export class CanadaCovidComponent implements OnInit {
  canadaData: any = {};
  loading = true;
  error = false;

  constructor(private covidService: CovidService) { }

  ngOnInit() {
    this.loadCanadaData();
  }

  loadCanadaData() {
    this.loading = true;
    this.error = false;
    
    this.covidService.getCanadaSummaryData().subscribe({
      next: (data) => {
        this.canadaData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Canada data:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  refresh() {
    this.loadCanadaData();
  }
}
