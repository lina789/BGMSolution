import { UserDataService } from './../service/user-data.service';
import { Component, OnInit } from '@angular/core';
import { UserPreviewService } from '../service/user-preview.service';
import { FormControl } from '@angular/forms';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // inpage values
  b_name: string = "Davids Co";
  b_type: string = "Web Shop";
  mobile: string = "0501234585";
  phone: string = "046999745";
  city: string = "Nazareth illit";
  country: string = "Israel";
  address: string = "Hazoref 6, har yona";

  firstName: string ="David"
  lastName: string = "Berdichevsky"
  email: string = "DavidMD@bgm.com"


  
  // Define the original budget per line
  
  budgetFacebook: number;
  budgetInstagram: number;
  budgethGoogleP : number;
  budgetGoogleAdWords: number;
  budgetGoogle: number;
  budgetGoogleMybuissness: number;
  budgetTwiiter: number;

  // group of password and confiramtion
  passwordFormGroup: FormGroup;


  constructor(private userdata: UserDataService, private userPreview: UserPreviewService, private fb: FormBuilder) {
    
    //password validator stat function
    this.passwordFormGroup = this.fb.group({
      password: ['', Validators.required],
      oldPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      
      //request for password validation
      validator: passwordFormValidator.validate.bind(this)
    });

  }

  // chart deceleration //

  // apply MDB Chart preference type doughnut
  public chartType:string = 'doughnut';
  // chart data inserted array: here we place the budgets
  public chartData:Array<any>  = [50,50,50,50,50,50,50];

  // chart data inserted array: here we place the names
  public chartLabels:Array<any> = ['GoogleP', 'Instagram', 'Facebook', 'Twiiter',  'GoogleAdWords', 'Google', 'GoogleMybuissness'];

// chart data inserted array: on hover change color and set chart color
public chartColors:Array<any> = [{
  hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
  hoverBorderWidth: 0,
  backgroundColor: ["#e5110d", "#e21dd5", "#4250f4","#00bdf7", "#06aa0f", "#fffa00", "#8c8c8c" ], //same as set on lable
  hoverBackgroundColor: ["#e28583", "#db64d3", "#5c67ed", "#3392af", "#73ce78","#d3d043", "#d8d8d8" ]
}];

public chartOptions:any = {
  responsive: true
};
  // chart hover and chart click: empty will put label and action nothing
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  //password change
  passChange(){
    console.log(this.passwordFormGroup.value.oldPassword)
    console.log(this.passwordFormGroup.value.password)
    console.log(this.passwordFormGroup.value.confirmPassword)
  }
  
  
  

  ngOnInit() {
    // Request data from server
    this.userdata.getUserData().subscribe(
      data=>{
        
        this.b_name = data.b_name,
        this.b_type = data.b_type, 
        this.mobile = data.mobile, 
        this.phone = data.phone, 
        this.city = data.city, 
        this.country = data.country, 
        this.address = data.address, 
        this.firstName = data.firstName, 
        this.lastName = data.lastName, 
        this.email = data.email
        
      }
    );
 
    //server up get request for data
    this.userPreview.getPreview().subscribe(Data =>{
      this.createChart(Data);
      this.budgetFacebook = Data.budgetFacebook,
      this.budgetInstagram = Data.budgetInstagram,
      this.budgethGoogleP = Data.budgethGoogleP,
      this.budgetGoogleAdWords = Data.budgetGoogleAdWords,
      this.budgetGoogle = Data.budgetGoogle,
      this.budgetGoogleMybuissness = Data.budgetGoogleMybuissness,
      this.budgetTwiiter = Data.budgetTwiiter
    });
    
    



  }

    createChart(Data){
      // chart data inserted array: here we place the budgets
      this.chartData = [Data.budgethGoogleP, Data.budgetInstagram, Data.budgetFacebook, Data.budgetTwiiter, Data.budgetGoogleAdWords, Data.budgetGoogle, Data.budgetGoogleMybuissness];
        
    }


}

// password validator front end form
class passwordFormValidator {
  static validate(passwordFormGroup: FormGroup) {
      let password = passwordFormGroup.controls.password.value;
      let confirmPassword = passwordFormGroup.controls.confirmPassword.value;
      if (confirmPassword != password) {
          return {
              doesMatchPassword: true  
          };
      }

      return null;

  }
}


