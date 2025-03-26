import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface CovidData {
  id: string;
  date: string;
  health_unit: string;
  new_cases: number;
  total_cases: number;
  active_cases: number;
  resolved_cases: number;
  deaths: number;
}

export interface OntarioSummaryData {
  total_cases: string;
  total_deaths: string;
  active_cases: string;
  recovered: string;
  hospitalizations: string;
  icu: string;
  last_updated: string;
  data_source: string;
}

export interface CanadaSummaryData {
  total_cases: string;
  total_deaths: string;
  active_cases: string;
  recovered: string;
  last_updated: string;
  data_source: string;
}

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private ontarioDataSubject = new Subject<any>();
  private ontarioData: CovidData[] = [];
  private dataFilePath = 'assets/ontario-covid-data.json';
  private dataLastFetched: Date | null = null;


  private canadaDataSource = 'https://health-infobase.canada.ca/covid-19/epidemiological-summary-covid-19-cases.html';
  private ontarioDataSource = 'https://covid-19.ontario.ca';
  
  constructor(private http: HttpClient) { 

    this.loadInitialData();
  }


  private loadInitialData() {
    this.downloadOntarioData().subscribe({
      next: (data) => {
        console.log('Ontario data loaded successfully');
        this.ontarioData = data;
        this.dataLastFetched = new Date();
      },
      error: (err) => console.error('Failed to load initial data:', err)
    });
  }

  getCanadaSummaryData(): Observable<CanadaSummaryData> {
    return of({
      total_cases: '4,630,790',
      total_deaths: '53,173',
      active_cases: '6,082',
      recovered: '4,571,535',
      last_updated: new Date().toISOString().split('T')[0],
      data_source: this.canadaDataSource
    });
  }

  getOntarioStatusData(): Observable<OntarioSummaryData> {
    return of({
      total_cases: '1,325,279',
      total_deaths: '16,204',
      active_cases: '1,632',
      recovered: '1,307,443',
      hospitalizations: '468',
      icu: '97',
      last_updated: new Date().toISOString().split('T')[0],
      data_source: this.ontarioDataSource
    });
  }

  downloadOntarioData(): Observable<CovidData[]> {
    
    return this.http.get<CovidData[]>(this.dataFilePath).pipe(
      tap(data => {
        this.dataLastFetched = new Date();
      }),
      catchError(error => {
        console.error('Error loading Ontario data:', error);
        return throwError(() => new Error('Failed to load COVID-19 data. Please try again later.'));
      })
    );
  }


  getOntarioDataRecords(): Observable<CovidData[]> {
    if (this.ontarioData && this.ontarioData.length > 0) {
      return of(this.ontarioData);
    }
    
    return this.downloadOntarioData().pipe(
      map(data => {
        this.ontarioData = data;
        return data;
      })
    );
  }


  getRecordById(id: string): Observable<CovidData | undefined> {
    if (this.ontarioData && this.ontarioData.length > 0) {
      const record = this.ontarioData.find(record => record.id === id);
      if (record) {
        return of(record);
      }
    }
    
    return this.getOntarioDataRecords().pipe(
      map(records => records.find(record => record.id === id))
    );
  }


  private messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();

  sendMessage(message: string) {
    console.log(`Sending message: ${message}`);
    this.messageSubject.next(message);
  }


  getDataLastFetched(): Date | null {
    return this.dataLastFetched;
  }


  getDataSources() {
    return {
      canada: this.canadaDataSource,
      ontario: this.ontarioDataSource
    };
  }
}
