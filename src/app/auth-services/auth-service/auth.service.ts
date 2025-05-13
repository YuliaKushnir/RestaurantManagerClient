import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const BASIC_URL = "http://localhost:8080/api/";
const BASIC_URL = "https://restaurantmanager-51hv.onrender.com/api/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signuprequest:any):Observable<any>{
    return this.http.post(BASIC_URL + "auth/signup", signuprequest);
  }
  
  login(loginRequest:any):Observable<any>{
    return this.http.post(BASIC_URL + "auth/login", loginRequest);
  }
}
