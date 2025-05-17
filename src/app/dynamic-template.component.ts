import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as Handlebars from 'handlebars';
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

    const template = await this.templateService.getTemplate();
    const data = await this.templateService.getData();

    const templateFn = Handlebars.compile(template);

    // Safe way to set HTML in Angular
    // this.html = templateFn(data);

    // Bypass Angular's sanitization for this HTML
    this.html = this.sanitizer.bypassSecurityTrustHtml(templateFn(data));
  }
}