import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  public naam: FormControl;
  public voornaam: FormControl;
  public geboorteDatum: FormControl;
  public telefoonNummer: FormControl;
  public email: FormControl;
  public gewicht: FormControl;
  public lengte: FormControl;
  public geslacht: string;
  public berekend: boolean;
  public geschikt: boolean;
  public submit: boolean;

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.berekend = false;
    this.geschikt = false;
    this.submit = false;
    this.createFormControls();
    this.createForm();
    this.geslacht = 'man';
  }

  createFormControls() {
    this.naam = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.voornaam = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.telefoonNummer = new FormControl('', [
      Validators.required,
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.geboorteDatum = new FormControl('', [
      Validators.required,
      this.dateCheckerValidator
    ]);
    this.gewicht = new FormControl('', Validators.required);
    this.lengte = new FormControl('', [
      Validators.required,
      this.lengthValidator
    ]);
  }

  createForm() {
    this.myForm = new FormGroup({
      naam: this.naam,
      voornaam: this.voornaam,
      email: this.email,
      telefoonNummer: this.telefoonNummer,
      geboorteDatum: this.geboorteDatum,
      gewicht: this.gewicht,
      lengte: this.lengte
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.submit = true;
      const data = {
        'id': 1,
        'name': this.naam.value,
        'preName': this.voornaam.value,
        'birthDay': this.geboorteDatum.value,
        'email': this.email.value,
        'gender': this.geslacht,
        'phoneNumber': this.telefoonNummer.value,
        'weight': this.gewicht.value,
        'length': this.lengte.value
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        })
      };
      this.http.post<boolean>('https://springrestserver.herokuapp.com/api/calculate', JSON.stringify(data), httpOptions)
        .subscribe(val => {
          this.geschikt = val;
          this.berekend = true;
        });
    }
  }

  dateCheckerValidator(control: FormControl) {
    const value = control.value;
    if (value) {
      const year = new Date(value).getFullYear();
      if (year > 2000 || year < 1900) {
        return {
          dateChecker: {
            datavalue: 'No correct date'
          }
        };
      }
    }
    return null;
  }

  lengthValidator(control: FormControl) {
    const value = control.value;
    if (value) {
      if (value < 1 || value > 2) {
        return {
          lengthChecker: {
            length: 'No correct length'
          }
        };
      }
    }
    return null;
  }
}
