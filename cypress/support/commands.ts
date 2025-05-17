/// <reference types="cypress" />


Cypress.Commands.add('setMockJwt', () => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
        userId: '123456',
        username: 'mockUsers',
        groups: ['admin', 'user'],
        permissions: ['read', 'write'],
        exp: Math.floor(Date.now() / 1000) + 60 * 60
    };
    function base64url(source: any) {
        return btoa(JSON.stringify(source))
            .replace(/=+$/, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    const encodedHeader = base64url(header);
    const encodedPayload = base64url(payload);
    const signature = 'mock-signature';
    const mockJwt = `${encodedHeader}.${encodedPayload}.${signature}`;
    window.localStorage.setItem('jwt', mockJwt);
});

declare namespace Cypress {
    interface Chainable {
        setMockJwt(): void;
    }
}
