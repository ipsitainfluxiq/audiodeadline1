import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Http} from "@angular/http";
import {Commonservices} from "../app.commonservices";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Commonservices]
})
export class DashboardComponent implements OnInit {
  private userdata: CookieService;
  public userdetails:any=[];
  items:any;
  commonservices:Commonservices;
  coockieData:CookieService;
  public userid;
  public serverurl;
  constructor(private _http: Http, private router: Router, userdata: CookieService, private _commonservices: Commonservices) {
    this.coockieData= userdata;
    this.commonservices=_commonservices;
    this.items = _commonservices.getItems();
    this.serverurl=_commonservices.url;
    console.log(this.serverurl);
    let userdata2: any;
    userdata2= userdata.getObject('userdetails');
    console.log(userdata2);

    if (typeof (userdata2) == 'undefined') {
      this.router.navigateByUrl('/login');
    } else {
      this.userid = userdata2._id;
      this.getUserDetails();
    }

  }

  ngOnInit() {
  }
  logout()
  {
    this.coockieData.removeAll();
    this.router.navigateByUrl('');
  }
  getUserDetails(){
    var link =this.serverurl+'dashboard';
    var data = {_id: this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          console.log(result.item);
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            let userdet = result.item;
            this.userdetails = userdet;
          }
        }, error => {
          console.log("Oooops!");
        });
  }
}
