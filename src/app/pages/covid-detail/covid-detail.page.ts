import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { CovidService, CovidData } from '../../services/covid.service';

@Component({
  selector: 'app-covid-detail',
  templateUrl: './covid-detail.page.html',
  styleUrls: ['./covid-detail.page.scss'],
  standalone: false,
})
export class CovidDetailPage implements OnInit {
  recordId: string = '';
  record: CovidData | null = null;
  loading = true;
  error = false;
  message: string = '';
  dataUpdated: string = new Date().toISOString().split('T')[0]; // Current date
  dataSources: { canada: string, ontario: string } = { canada: '', ontario: '' };

  constructor(
    private route: ActivatedRoute,
    private covidService: CovidService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
    this.dataSources = this.covidService.getDataSources();
  }

  ngOnInit() {
    this.recordId = this.route.snapshot.paramMap.get('id') || '';
    this.loadRecordDetails();
    
    // Get the data timestamp
    const lastFetched = this.covidService.getDataLastFetched();
    if (lastFetched) {
      this.dataUpdated = lastFetched.toISOString().split('T')[0];
    }
  }

  loadRecordDetails() {
    if (!this.recordId) {
      this.error = true;
      this.loading = false;
      this.showToast('Error: Record ID is missing');
      return;
    }

    this.loading = true;
    this.error = false;

    this.covidService.getRecordById(this.recordId).subscribe({
      next: (data) => {
        if (data) {
          this.record = data;
          this.loading = false;
        } else {
          this.error = true;
          this.loading = false;
          this.showToast('Error: Record not found');
        }
      },
      error: (err) => {
        console.error('Error fetching record details:', err);
        this.error = true;
        this.loading = false;
        this.showToast('Error loading data. Please try again.');
      }
    });
  }

  async sendMessage() {
    if (this.message.trim()) {
      this.covidService.sendMessage(this.message);
      
      // Show a success toast
      const toast = await this.toastCtrl.create({
        message: 'Message sent successfully to Ontario tab',
        duration: 2000,
        position: 'bottom',
        color: 'success',
        buttons: [
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      });
      await toast.present();
      
      this.message = '';
    }
  }

  goBackToOntario() {
    this.navCtrl.navigateBack('/tabs/tab2');
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
}
