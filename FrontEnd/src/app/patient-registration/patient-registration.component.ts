import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { DoctorRegistrationService } from '../doctor-registration.service';
import { PatientRegistrationService } from '../patient-registration.service';
import { City, District } from '../patient';


@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  patientForm: FormGroup;
  message: string = '';
  doctors: any[] = [];
  cities: City[] = [
    { id: 1, name: 'Ankara', districts: [{ id: 1, name: 'Keçiören' }, { id: 2, name: 'Çankaya' }, { id: 3, name: 'Yenimahalle' }, { id: 4, name: 'Polatlı' }] },
    { id: 2, name: 'İstanbul', districts: [{ id: 5, name: 'Kartal' }, { id: 6, name: 'Kadıköy' }, { id: 7, name: 'Maltepe' }] },
    { id: 3, name: 'İzmir', districts: [{ id: 8, name: 'Bornova' }, { id: 9, name: 'Buca' }, { id: 10, name: 'Çeşme' }] }
  ];
  availableDistricts: District[] = [];

  constructor(
    private fb: FormBuilder,
    private patService: PatientRegistrationService,
    private doctorService: DoctorRegistrationService
  ) {
    this.patientForm = this.fb.group({
      patientId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Sayısal doğrulama
      patientName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfVisit: ['', Validators.required],
      prescription: [''],
      doctorId: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
    //  phoneNumbers: this.fb.array([this.createPhoneNumberField()])
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe(
      (data: any) => this.doctors = data,
      (error: any) => console.error('Doktorları yüklerken hata oluştu:', error)
    );
  }

/*  addPhoneNumberField(): void {
    this.phoneNumbers.push(this.createPhoneNumberField());
  }

  createPhoneNumberField(): FormControl {
    return this.fb.control('', [Validators.required, Validators.pattern('^[0-9]*$')]);  // Sayısal doğrulama
  } */
    selectedCity: City | null = null;
    selectedDistrict: District | null = null;
    
    onCityChange(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      this.selectedCity = this.cities.find(city => city.id === +selectElement.value) || null;
      this.availableDistricts = this.selectedCity ? this.selectedCity.districts : [];
      this.patientForm.value.city = this.selectedCity;
       // Şehri obje olarak ayarlar
    }
    
    onDistrictChange(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      this.selectedDistrict = this.availableDistricts.find(district => district.id === +selectElement.value) || null;
      this.patientForm.value.district = this.selectedDistrict;

    }
    

  /* get phoneNumbers(): FormArray {
    return this.patientForm.get('phoneNumbers') as FormArray;
  } */

  registerPatNow(): void {
    if (this.patientForm.valid) {
      this.patientForm.value.city = this.selectedCity;
      this.patientForm.value.district = this.selectedCity;

      this.patService.doPatRegistration(this.patientForm.value).subscribe(
        (data: any) => {
          this.message = 'Hasta kaydı başarılı!';
          this.patientForm.reset();  // Formu temizle
          this.availableDistricts = [];  // İlçeler listesini temizle
        /*  while (this.phoneNumbers.length > 1) {
            this.phoneNumbers.removeAt(1);  // Ekstra telefon numarası alanlarını temizle
          } */
        },
        (error: any) => {
          console.error('Hata oluştu:', error);
          this.message = 'Hasta kaydı sırasında bir hata oluştu. Lütfen tekrar deneyiniz.';
        }
      );
    } else {
      this.message = 'Lütfen tüm gerekli alanları doldurun.';
    }
  }
}
