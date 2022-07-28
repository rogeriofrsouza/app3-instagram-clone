import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app3-instagram-clone';

  constructor(public app: FirebaseApp) { }

}
