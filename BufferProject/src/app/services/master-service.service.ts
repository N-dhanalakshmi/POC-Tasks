import { Template } from './../interfaces/template';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employees } from '../interfaces/employee-list';
import { Users } from '../interfaces/user';
import { AddUser } from '../interfaces/add-employee';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {
apiBaseAddress = 'http://localhost:5166/Master/';

private content = new BehaviorSubject<any>('');

private buttonVisibility : boolean = true;

constructor(private http: HttpClient) { }

loginUser(login:Login) : Observable<string>{
  return this.http.post(this.apiBaseAddress+'Login', login, { responseType: 'text' });
}

showAllEmployees(): Observable<Employees[]> {
  return this.http.get<Employees[]>(this.apiBaseAddress + 'AllEmployees')
}

showEmployeesBySearch(searchKey : string): Observable<Employees[]> {
  return this.http.get<Employees[]>(this.apiBaseAddress + `EmployeesBySearch?SearchKey=${searchKey}`)
}

viewEmployee(email : string) : Observable<Users> {
  return this.http.get<Users>(this.apiBaseAddress + `UserById?Email=${email}`);
}

updatePassword(email:string,password:string) {
  console.log(email + password)
  return this.http.put(this.apiBaseAddress+`UpdatePassword?Email=${email}&Password=${password}`,null);
}

addUser(data : AddUser) {
  return this.http.post<AddUser>(this.apiBaseAddress+'AddUser',data);
}

saveTemplate(template : Template){
  return this.http.post<Template>(this.apiBaseAddress+'SaveTemplate',template);
}

getTemplate() : Observable<Template[]>{
  return this.http.get<Template[]>(this.apiBaseAddress+`Templates`);
}

handleRequest(){
  // if (navigator.sendBeacon) {
  //   const data = JSON.stringify({
  //     token: localStorage.getItem('token'),
  //     Response : 'Page is closed/changed'
  //   });
  //     navigator.sendBeacon(
  //       this.apiBaseAddress +
  //         'EventResponse' ,
  //         data
  //     );
  //   } else {
  fetch(
    this.apiBaseAddress +
      `EventResponse?Response=${'Page is closed/changed'}`,
    {
      method: 'POST',
      body: null,
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      },
      keepalive: true,
    }
  );
  localStorage.removeItem('token');
// }
}

public getContent() {
  return this.content.asObservable();
}

public setContent(content: HTMLElement|null) {
  this.content.next(content);
}

public getButtonVisibility() {
  return this.buttonVisibility;
}

public setButtonVisibility(visibility : boolean) {
  this.buttonVisibility = visibility;
}

}
