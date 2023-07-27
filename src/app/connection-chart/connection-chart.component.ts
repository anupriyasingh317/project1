import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-connection-chart',
  templateUrl: './connection-chart.component.html',
  styleUrls: ['./connection-chart.component.css']
})
export class ConnectionChartComponent implements OnInit {
  public months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public statuses: string[] = ['all', 'pending', 'approved', 'rejected'];
  public selectedMonth: string = '';
  public selectedStatus: string = '';
  public chartData: ChartDataSets[] = [];
  public chartLabels: Label[] = [];
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartColors: Color[] = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }
  ];
  public chartLegend = true;
  public chartType = 'bar';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.updateChart();
  }

  public updateChart(): void {
    const url = `/api/chartData?status=${this.selectedStatus}&month=${this.selectedMonth}`;
    this.http.get<any[]>(url).subscribe((data) => {
      this.chartData = [
        {
          data: data.map(item => item.count),
          label: 'Number of Connection Requests',
        }
      ];
      this.chartLabels = data.map(item => item.month);
    });
  }
}
