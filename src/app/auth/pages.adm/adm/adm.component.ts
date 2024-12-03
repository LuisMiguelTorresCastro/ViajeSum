import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent {
  showTree = false; 

  constructor(private router: Router, private http: HttpClient) {}

  toggleTree() {
    this.showTree = !this.showTree;
  }

  logout() {
    this.http.post('/logout', {}).subscribe(
      (response: any) => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error logging out:', error);
      }
    );
  }
}
