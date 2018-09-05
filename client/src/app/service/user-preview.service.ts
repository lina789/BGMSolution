import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

interface respData {
  budgetFacebook: number;
  budgetInstagram: number;
  budgethGoogleP: number ;
  budgetGoogleAdWords: number;
  budgetGoogle: number;
  budgetGoogleMybuissness: number;
  budgetTwiiter: number;
  
  message: {
    user_budget: number,
    platforms_budget: [
        {
            platform_id: string,
            platform_name: string,
            platform_budget_percent: number,
            platform_budget: number
        }];
      }

  platforms:[
    {
      platform_id: string,
      platform_name: string,
      platform_budget: number
    }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class UserPreviewService {

  constructor(private http: HttpClient) { }

  //get preview info from backend HTTP

  getPreview(){

    //will get user info if correct
    const uri = 'http://www.mocky.io/v2/5b9011002e0000741ba89dea';

    //object with email payload
    const obj = {
      user_email: jwt_decode(localStorage.getItem('token')).userID,
      token: localStorage.getItem('token')
    }
    console.log(obj)
    //get data from server
    return this.http.post<respData>(uri,obj)
    
  }
}
