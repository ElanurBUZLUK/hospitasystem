import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {

  // Tüm hasta işlemleri için temel URL
  private baseUrl = 'http://localhost:8080/api/patients'; 

  constructor(private http: HttpClient) { }

  // Yeni bir hasta kaydı oluşturma
  doPatRegistration(patientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, patientData, { responseType: 'text' as 'json' });
  }

  // Hasta ID'sine göre belirli bir hastayı getirme
  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Tüm hastaları listeleme
  getAllPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  // Hasta bilgilerini güncelleme
  updatePatient(id: number, patientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, patientData, { responseType: 'text' as 'json' });
  }

  // Hasta kaydını silme
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }
}
