import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from "../app.commonservices";
declare var $ : any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [Commonservices]
})
export class SignupComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  items:any;
  public serverurl;
  public is_error;
  public emailexist;
  public showerror;
  commonservices:Commonservices;
  public data: any = [];
  public state: any = [];
  public showurl;
  public domain;
  public matches;
public val;
  constructor(fb: FormBuilder,private _http: Http,private router: Router, private _commonservices : Commonservices) {
    this.fb = fb;
    //this.emailerrormsg='';
    this.commonservices=_commonservices;
    this.items = _commonservices.getItems();
    this.serverurl=_commonservices.url;
    console.log(this.serverurl);

    let link=this.serverurl+'getusastates';
    //let link='http://localhost:3007/getusastates';
    this._http.get(link)
        .subscribe(res => {
          let result1 = res.json();
          for(let i in result1){
            this.state[i]= result1[i].name;
          }
        }, error => {
          console.log("Oooops!");
        });

    this.showurl= window.location.origin;
    this.matches = this.showurl.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    this.domain = this.matches && this.matches[1];
    //console.log(matches);
    console.log(this.domain);
/*    var res = this.domain.split(".", 1);
    console.log("res "+res);*/
  }

  ngOnInit() {

    this.dataForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      phone: ["", Validators.required],
    //  email: ["", SignupComponent.validateEmail, this.isemailunique.bind(this)],
     // email: ["", SignupComponent.validateEmail,this.isemailexist.bind(this)],
      email: ["", SignupComponent.validateEmail],
      username: ["", Validators.required],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required],
      address: ["", Validators.required],
      address2: [""],
      city: ["", Validators.required],
      state: [""],
      zip: ["", Validators.required],
      rsvp: [""],
      signupaffiliate: [""],
    }, {validator: this.matchingPasswords('password', 'confirmpassword')});


/*    let link='http://localhost:3007/emaildetails';
    this._http.get(link)
        .subscribe(res => {
         let result = res.json();
         for (let i in result) {
            this.data[i] = result[i].email;
         }
         console.log("hope emails show here");
         for(let i in this.data){
           console.log(this.data[i]);
         }
        }, error => {
          console.log("Oooops!");
        });*/


  }
//console.log(this.data);
 /* isemailunique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.commonservices.isEmailRegisterd(control.value).subscribe(res => {
          resolve(null);
          console.log(res);
          console.log("1st");
          //this.emailexist = 'Email id exist ';
        }, () => {
          console.log(67);
              resolve({ 'isEmailUnique': true }); });
      }, 1000);
    });

    return q;
  }*/

/*  isemailexist(control: FormControl){

    const promise = new Promise((resolve, reject) => {
      let givenemail=control.value;
      console.log(givenemail);
      for(let i in this.data){
       if(this.data[i]==givenemail){
         var a= this.data.indexOf(this.data[i]);
       }
      }
      console.log("array index is "+a);
      if(a==undefined){
        this.emailexist=true;
        this.showerror='Email id already exist............... !!!';
      }
      else{
        this.emailexist=false;
      }
      resolve();


    });
/!*    let givenemail=control.value;
    console.log(givenemail);
    console.log("this is is emailexist");
    for(let i in this.data){
      console.log(this.data[i]);
    }*!/
}*/

    static validateEmail(control: FormControl){
      /*if (control.value=='' || !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)          +[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return { 'invalidEmailAddress': true };
    }*/
      if(control.value==''){
        //this.emailerrormsg='Email field can not be blank';
        return { 'invalidemail': true };
      }
      if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        //this.emailerrormsg='Invalid email..';
        return { 'invalidemail': true };
      }
  }

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        console.log('mismatch');
        console.log(this.dataForm.controls['confirmpassword'].valid);

        return {
          mismatchedPasswords: true
        };
      }
    }
  }


  dosubmit(formval) {
      console.log("this is dosubmit");
    let x: any;
    console.log(this.dataForm.valid);
    for (x in this.dataForm.controls) {
      //console.log(this.dataForm.controls[x]);
      this.dataForm.controls[x].markAsTouched();
    }
   var link = this.serverurl+'signup';
    //var link = 'http://localhost:3007/signup';
    console.log(this.dataForm.valid);
    if (this.dataForm.valid) {
console.log(this.domain);
      if(this.domain == 'audiodeadline.com'){
        this.val = 0;
      }
      else {
        var res = this.domain.split(".", 1);
       // console.log(res);
        this.val = res[0];
      }
      console.log(this.val);
        var data = {
          firstname: formval.firstname,
          lastname: formval.lastname,
          phone: formval.phone,
          email: formval.email,
          username: formval.username,
          password: formval.password,
          address: formval.address,
          address2: formval.address2,
          city: formval.city,
          state: formval.state,
          zip: formval.zip,
          rsvp: formval.rsvp,
          signupaffiliate: formval.signupaffiliate,
          parent: this.val
        };

       this._http.post(link, data)
           .subscribe(res => {
             var result = res.json();
             console.log(result.status);
             if(result.status=='success'){
               $('#popthankyou').modal('show');
             }
             else {
               this.is_error= result.msg;
                console.log(this.is_error);
             }
           }, error => {
             console.log("Oooops!");
           });
    }
  }


}
