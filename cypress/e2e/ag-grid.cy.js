/// <reference types="cypress" />

describe('AG Grid', () => {
  beforeEach(() => {
    cy.setMockJwt();
    cy.visit('/');
  });

  it('should render the AG Grid component', () => {
    cy.get('.ag-root').should('exist');
  });

  it('should display column headers', () => {
    cy.get('.ag-header-cell-text').should('have.length.greaterThan', 0);
  });

  it('should display at least one row', () => {
    cy.get('.ag-center-cols-container .ag-row').should('have.length.greaterThan', 0);
  });

  it('should allow changing the column position by drag and drop', () => {
    // Get the first and second column headers
    cy.get('.ag-header-cell').eq(0).as('firstCol');
    cy.get('.ag-header-cell').eq(1).as('secondCol');

    // Use the drag command from the plugin
    cy.get('@firstCol').drag('@secondCol');

    // Assert that the first column header text is now in the second position
    cy.get('.ag-header-cell-text').eq(1).should('have.text', 'Price');
  });

  it('should update grid data at high frequency', () => {
    cy.visit('/');
    cy.get('.ag-center-cols-container .ag-row').first().find('.ag-cell').eq(1).invoke('text').then((initialPrice) => {
      cy.wait(500);
      cy.get('.ag-center-cols-container .ag-row').first().find('.ag-cell').eq(1).invoke('text').should((newPrice) => {
        expect(newPrice).not.to.eq(initialPrice);
      });
    });
  });
});
