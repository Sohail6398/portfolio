import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { EmailJsCredential } from '../../core/constants/EmailJSCredential';
import { ToastrService } from 'ngx-toastr';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-contact',
  imports: [FormsModule,RecaptchaModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  captchaToken: string | null = null;
  constructor(private toastr: ToastrService) { }

  form = {
    name: '',
    email: '',
    phone: '', // Added phone property
    subject: '',
    message: ''
  };
  resolved(token: string | null) {
    this.captchaToken = token;
  }
  loading = false;

  sendMail() {
    this.loading = true;
    if (!this.captchaToken) {
      this.toastr.error("Please verify the reCAPTCHA.", "Error");
      this.loading = false;
      return;
    }
    // These keys must perfectly match the {{variable}} tags inside your EmailJS dashboard template!
    const templateParams = {
      from_name: this.form.name,
      from_email: this.form.email,
      phone_number: this.form.phone, // Passing phone property
      subject: this.form.subject,
      message: this.form.message
    };

    emailjs.send(
      EmailJsCredential.serviceId,
      EmailJsCredential.templateId,
      templateParams,
      EmailJsCredential.publicKey
    ).then(() => {
      this.toastr.success('Message sent successfully!', 'Success');
      this.form = {
        name: '',
        email: '',
        phone: '', // Clear field on success
        subject: '',
        message: ''
      };
      this.loading = false;
    }).catch(() => {
      this.toastr.error('Unable to send message.', 'Error');
      this.loading = false;
    });
  }
}
