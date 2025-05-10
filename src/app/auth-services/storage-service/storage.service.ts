import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static getUserId():string{
    const user = this.getUser();
    if(user == null) return '';

    return user.id;
  }

  static saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user:any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // static getToken():string{
  //   return localStorage.getItem(TOKEN);
  // }


  static getToken(): string | null {
    return typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN) : null;
  }

  static getUser():any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getRole():string {
    const user = this.getUser();
    if(user == null) {
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn():boolean{
    if(this.getToken() === null){
      return false;
    }
    const role:string = this.getRole();
    return role == "ADMIN";
  }

  static isUserLoggedIn():boolean{
    if(this.getToken() === null){
      return false;
    }
    const role:string = this.getRole();
    return role == "USER";
  }

  static signOut(): void{
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(TOKEN);
  }


}
