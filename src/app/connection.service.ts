
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private baseUrl = 'http://127.0.0.1:5000'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all connection records
  getConnections() {
    return this.http.get<any[]>(`${this.baseUrl}/connections`);
    
  }

  // Get a specific connection by ID
  getConnectionById(connectionId: number) {
    return this.http.get<any>(`${this.baseUrl}/connections/${connectionId}`);
  }

  // Add new connection record
  addConnection(connectionData: any) {
    return this.http.post<any>(`${this.baseUrl}/add_connection`, connectionData);
  }

  // Update connection record
  updateConnection(connectionId: number, connectionData: any) {
    return this.http.put<any>(`${this.baseUrl}/connections/${connectionId}`, connectionData);
  }

  getChartData(status: string = 'all'): Observable<any> {
    // Append the 'status' query parameter to the API URL
    const url = `${this.baseUrl}/api/chartData?status=${status}`;
    return this.http.get<any>(url);
  }
}
