import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer
    ) { }

    async getCompiledTemplate(): Promise<string> {
        try {
            const [template, data] = await Promise.all([
                this.getTemplate(),
                this.getData()
            ]);
            return this.compileTemplate(template!, data);
        } catch (error) {
            console.error('Error compiling template:', error);
            return '<div class="error">Failed to load content</div>';
        }
    }

    async getTemplate() {
        // In a real app, replace with your API endpoint
        return this.http.get('assets/dynamic-template.html', {
            responseType: 'text'
        }).toPromise();
    }

     async getData(): Promise<any> {
        // In a real app, replace with your API endpoint
        return this.http.get('assets/template-data.json').toPromise();
    }

    private compileTemplate(template: string, data: any): string {
        // Process conditional blocks first
        template = this.processConditionalBlocks(template, data);

        // Process all other bindings
        return template.replace(/{{\s*([^}]+)\s*}}/g, (_, key) => {
            const value = this.getNestedValue(data, key);

            // Special handling for style properties
            if (key.startsWith('style.')) {
                return this.safeStyle(value);
            }

            // Special handling for class conditions
            if (key.startsWith('class.')) {
                return value ? key.replace('class.', '') : '';
            }

            return value !== undefined ? value : '';
        });
    }

    private processConditionalBlocks(template: string, data: any): string {
        return template
            .replace(/<template\s+\[if\]="([^"]+)"[^>]*>([\s\S]*?)<\/template>/g, (_, condition, content) => {
                const value = this.getNestedValue(data, condition);
                return value ? content : '';
            })
            .replace(/<template\s+\[ifNot\]="([^"]+)"[^>]*>([\s\S]*?)<\/template>/g, (_, condition, content) => {
                const value = this.getNestedValue(data, condition);
                return !value ? content : '';
            });
    }

    private getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((o, k) => (o || {})[k], obj);
    }

    private safeStyle(value: string): string {
        return this.sanitizer.sanitize(2, value) || '';
    }
}