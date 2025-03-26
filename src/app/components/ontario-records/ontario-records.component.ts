import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-ontario-records',
  templateUrl: './ontario-records.component.html',
  styleUrls: ['./ontario-records.component.scss'],
  standalone: false,
})
export class OntarioRecordsComponent implements OnInit {
  ontarioRecords: any[] = [];
  loading = true;
  error = false;
  message = '';

  constructor(private covidService: CovidService) { }

  ngOnInit() {
    this.loadOntarioRecords();
    
    this.covidService.message$.subscribe(message => {
      this.message = message;
    });
  }

  loadOntarioRecords() {
    this.loading = true;
    this.error = false;
    
    this.covidService.getOntarioDataRecords().subscribe({
      next: (data) => {
        this.ontarioRecords = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Ontario records:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  refresh() {
    this.loadOntarioRecords();
  }
}
