import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    html = `
    <style>
    .user-profile-card {
        border: 1px solid #ccc;
        padding: 20px;
        margin: 20px;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .user-profile-card h2 {
        font-size: 24px;
    }

    .user-profile-card p {
        font-size: 16px;
    }

    .address,
    .skills,
    .projects {
        margin-top: 10px;
    }

    .project {
        margin-bottom: 10px;
    }

    .colored-text {
        color: orange;
    }
</style>

<div class="user-profile-card">
    {{#if (eq user.name "John Doe")}}
    <h2 class="colored-text">{{user.name}}</h2>
    {{/if}}

    {{#if (notEq user.name "John Doe")}}
    <h2>{{user.name}}</h2>
    {{/if}}

    <p><strong>Email:</strong> {{user.email}}</p>

    {{#if user.address}}
    <div class="address">
        <h3>Address</h3>
        <p>{{user.address.street}}, {{user.address.city}}, {{user.address.zip}}</p>
    </div>
    {{/if}}

    {{#if user.skills.length}}
    <div class="skills">
        <h3>Skills</h3>
        <ul>
            {{#each user.skills}}
            <li>{{this}}</li>
            {{/each}}
        </ul>
    </div>
    {{else}}
    <p>No skills listed.</p>
    {{/if}}

    <div class="projects">
        <h3>Projects</h3>
        {{#each user.projects}}
        <div class="project">
            <h4>{{title}}</h4>
            <p>{{description}}</p>
            <p><strong>Status:</strong>
                {{#if isActive}}🟢 Active{{else}}🔴 Inactive{{/if}}
            </p>
        </div>
        {{/each}}
    </div>
    `;

    data = {
        "user": {
            "name": "John Doe",
            "email": "jane.doe@example.com",
            "address": {
                "street": "123 Elm Street",
                "city": "Springfield",
                "zip": "12345"
            },
            "skills": [
                "Angular",
                "TypeScript",
                "Node.js"
            ],
            "projects": [
                {
                    "title": "Customer Portal",
                    "description": "A web app for managing customer information and support tickets.",
                    "isActive": true
                },
                {
                    "title": "Internal Dashboard",
                    "description": "A private dashboard for business analytics and monitoring.",
                    "isActive": false
                }
            ]
        }
    };

    getTemplate() {
        return of(this.html);
    }

    getData() {
        return of(this.data);
    }


}