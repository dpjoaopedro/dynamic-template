import { Component } from '@angular/core';
import { DynamicTemplateComponent } from './dynamic-template.component';

@Component({
  selector: 'app-root',
  imports: [DynamicTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
