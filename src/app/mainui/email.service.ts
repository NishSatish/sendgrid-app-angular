import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  SaveAndSendMail(emailOfUser: string) {
    // const saveData = new FormData();
    // saveData.append('email', emailOfUser);
    const saveData = {
      email: emailOfUser
    };

    this.http.post<{ message: string }>('http://localhost:9696/subscribe/', saveData).subscribe((respaanse) => {
      console.log(respaanse.message);
    });
  }
}
