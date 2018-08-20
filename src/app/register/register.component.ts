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
  public email: FormControl;
  public gewicht: FormControl;
  public lengte: FormControl;
  public geslacht: string;
  public berekend: boolean;
  public geschikt: boolean;

  constructor(private router: Router, private http:HttpClient) {
  }

  ngOnInit() {
    this.berekend = false;
    this.geschikt = false;
    this.createFormControls();
    this.createForm();
    this.geslacht = 'man';
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*'
      })
    };
    this.http.get('https://opinionated-quotes-api.gigalixirapp.com/v1/quotes').subscribe(val => console.log(val));
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
      geboorteDatum: this.geboorteDatum,
      gewicht: this.gewicht,
      lengte: this.lengte
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.berekend = true;
      const bmi = this.gewicht.value / (this.lengte.value * this.lengte.value);
      const year = new Date(this.geboorteDatum.value).getFullYear();
      console.log('bmi is = ' + bmi);
      console.log('geboortejaar is = ' + year);
      console.log('Geslacht is ' + this.geslacht);
      this.geschikt = true;
      /*const txtFile = "assets/Data.txt";
      const file = new File(txtFile);
      var str = "My string of text";

      file.open("w"); // open file with write access
      file.writeln("First line of text");
      file.writeln("Second line of text " + str);
      file.write(str);
      file.close();*/
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
