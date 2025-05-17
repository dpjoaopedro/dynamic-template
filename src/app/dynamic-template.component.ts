import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as Handlebars from 'handlebars';
import { forkJoin } from 'rxjs';
import { TemplateService } from './template.service';

@Component({
  selector: 'app-dynamic-template',
  template: `
    @if(html) {
      <div class="dynamic-container" [innerHTML]="html"></div>
    }
  `
})
export class DynamicTemplateComponent implements OnInit {

  templateService = inject(TemplateService);
  sanitizer = inject(DomSanitizer);
  html!: SafeHtml;


  async ngOnInit(): Promise<void> {

    Handlebars.registerHelper('eq', (a, b) => a === b);
    Handlebars.registerHelper('notEq', (a, b) => a !== b);

    forkJoin([
      this.templateService.getTemplate(),
      this.templateService.getData()
    ]).subscribe(([template, data]) => {
      // Compile the template with Handlebars
      const templateFn = Handlebars.compile(template);

      // Safe way to set HTML in Angular
      // this.html = templateFn(data);

      // Bypass Angular's sanitization for this HTML
      this.html = this.sanitizer.bypassSecurityTrustHtml(templateFn(data));
    });
  }
}