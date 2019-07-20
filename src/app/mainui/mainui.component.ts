import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmailService } from './email.service';

@Component({
  selector: 'app-mainui',
  templateUrl: './mainui.component.html',
  styleUrls: ['./mainui.component.css']
})
export class MainuiComponent implements OnInit {

  constructor(private http: HttpClient, private emailService: EmailService) { }

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
    });
  }

  onSubscribeClick() {
    if (this.form.invalid) {
      return;
    }
    this.emailService.SaveAndSendMail(this.form.value.email);
  }

}
