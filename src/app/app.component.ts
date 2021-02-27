import { Component, OnInit } from "@angular/core";
import { SharedService } from "./services/shared.service"; //./services/shared.services

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  userNumber = "+918553208493";
  userMessage: any;
  phoneNumber: any[] = [
    {
      number: "+918553208493"
    },
    {
      number: "+919123099455"
    }
  ];
  inquiryForm = this.formBuilder.group({
    phone_number: new FormControl("", []),
    message: new FormControl("", [Validators.required])
  });
  constructor(
    private formBuilder: FormBuilder,
    private shared: SharedService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.inquiryForm.valid) {
      const _v = this.inquiryForm.value;
      const form = new FormData();
      // form.append("full_name", _v.full_name);
      // form.append("email", _v.email);
      form.append("phone_number", _v.phone_number);
      // form.append("purpose", _v.purpose);
      form.append("message", _v.message);
      let dataSet = {
        destination: this.userNumber,
        textMessage: this.userMessage
      };
      console.log(dataSet);
      this.shared.sendMessage(dataSet).subscribe(data => {
        const res = JSON.parse(JSON.stringify(data));
        if (res.status === 201) {
          console.log(res);
          const messSuc = <HTMLElement>document.getElementById("success");
          const messErr = <HTMLElement>document.getElementById("error");
          messSuc.style.display = "block";
          messErr.style.display = "none";
        } else {
          console.log(res);
          const messSuc = <HTMLElement>document.getElementById("success");
          const messErr = <HTMLElement>document.getElementById("error");
          messErr.style.display = "block";
          messSuc.style.display = "none";
        }
      });
      // Submit your form to app call
    }
  }
}
