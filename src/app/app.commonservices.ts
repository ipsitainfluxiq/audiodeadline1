/**
 * Created by kta pc on 6/16/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices{
    items:Array<any>;
    url:any
    constructor(private http: Http) {
            this.url = 'http://audiodeadline.com:3007/';
        this.items = [
            { serverUrl: this.url },
            { name: 'Ipsita' }
        ];
    }


    /*---------------------------------------------------START_URL-----------------------------------------------*/
    getItems() {
        return this.items;
    }

    /*---------------------------------------------------END_URL-----------------------------------------------*/
    /*isEmailRegisterd(email: string) {
        console.log(email);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var data= {email};
        var link='http://localhost:3007/allemail';
        //return this.http.post('http://localhost:3007/allemail', JSON.stringify({ email: email }), { headers: headers })
         return this.http.post(link , data)
            .map(res => {
                var result = res.json();
                console.log("length "+result.res);
                //console.log(v);
                //return result.res;
            }, error => {
            console.log("Oooops!");
        });


    }*/
    /*---------------------------------------------------START_Addadmin-----------------------------------------------*/
    postUser(dataForm:any) {

        var link = this.url+'adduser';

        var data = {
            firstname: dataForm.value.firstname,
            lastname:  dataForm.value.lastname,
            telephone:  dataForm.value.phone,
            email:  dataForm.value.email,
            password:  dataForm.value.password,
            address:  dataForm.value.address,
            address2:  dataForm.value.address2,
            city:  dataForm.value.city,
            state:  dataForm.value.state,
            zip:  dataForm.value.zipcode,
            rsvp:  dataForm.value.rsvp,
            signupaffiliate:  dataForm.value.signupaffiliate,
        };
        //console.log("addadminservice");
        //console.log(data);
        return this.http.post(link, data)
            .map((res:Response) => res.json());
    }
    /*---------------------------------------------------END_Addadmin-----------------------------------------------*/

}