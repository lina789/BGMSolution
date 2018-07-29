import { Injectable } from '@angular/core';
// Import of http service
import { HttpClient } from '@angular/common/http';
//router
import { Router } from '@angular/router';

//interface for returning router resp
interface respData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  

  constructor(private http: HttpClient, private router: Router) {}


  userSettings(company){
    console.log(company);
    const uri = 'http://localhost:1234/signup/usersettings';
    const obj = {
    
      b_name: company.b_name,
      b_type: company.b_type,
      mobile: company.mobile,
      phone: company.phone,
      city: company.city,
      country: company.country,
      address: company.address
    };
    //post registration to server
    return this.http.post<respData>(uri, obj)

  }



}
