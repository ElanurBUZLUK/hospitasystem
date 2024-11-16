import { Component, OnInit } from '@angular/core';
import { PatientRegistrationService } from '../patient-registration.service';

@Component({
  selector: 'app-show-patient',
  templateUrl: './show-patient.component.html',
  styleUrls: ['./show-patient.component.css']
})
export class ShowPatientComponent implements OnInit {

  patients: any;
  message: any;
  patientId: any;

  constructor(private service: PatientRegistrationService) {}

  public deletePatient(patientId: number) {
    this.service.deletePatient(patientId).subscribe(
      (data) => {
        this.message = `Patient with ID ${patientId} deleted successfully.`;
        this.patients = null; // Clear patient details after deletion
      },
      (error) => {
        this.message = `Error deleting patient: ${error.message}`;
      }
    );
  }

  public getPatientDetails(patientId: number) {
    this.service.getPatientById(patientId).subscribe(
      (data) => {
        this.patients = data;
        console.log("Patient Data:", this.patients);
      },
      (error) => {
        this.message = `Error fetching patient details: ${error.message}`;
      }
    );
  }

  ngOnInit(): void {}
}
