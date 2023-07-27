import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.css'],
})
export class ConnectionListComponent implements OnInit {
  connections: any[] = [];
  searchApplicantId: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private datePipe: DatePipe, private connectionService: ConnectionService) {}

  ngOnInit() {
    this.fetchConnections();
  }

 
  fetchConnections() {
    this.connectionService.getConnections().subscribe(
      (data) => {
        if (this.searchApplicantId) {
          // If an Applicant ID is provided, filter the connections based on it
          this.connections = data.filter(connection => connection.id === this.searchApplicantId);

        } 
        else if (this.startDate && this.endDate) {
         
          this.connections = data.filter(connection => {
          const dateOfApplication = new Date(connection.Date_of_Application);
          if (!isNaN(dateOfApplication.getTime())) {
          // Format dates to "dd-MM-yyyy" format
          const startDateFormatted = this.datePipe.transform(this.startDate, 'dd-MM-yyyy');
          const endDateFormatted = this.datePipe.transform(this.endDate, 'dd-MM-yyyy');
          const dateOfApplicationFormatted = this.datePipe.transform(dateOfApplication, 'dd-MM-yyyy');
          // console.log(startDateFormatted,dateOfApplicationFormatted);

          // Compare formatted dates
          return dateOfApplicationFormatted! >= startDateFormatted! && dateOfApplicationFormatted! <= endDateFormatted!;
        } else {
          // Handle invalid date value here (optional)
          return false; }  
        });

        } 
        else {
          // If no Applicant ID is provided, fetch all connections
          this.connections = data;
        }
      },
      (error) => {
        console.error('Error fetching connections:', error);
      }
    );
  }

  searchConnections() {
    this.fetchConnections();
  }
}
