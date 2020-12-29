describe('core', () => {
  beforeEach(() => cy.visit('/iframe.html?id=coriconcomponent--primary&knob-color&knob-badge&knob-badgeSize=small&knob-badgeBackground=warn&knob-badgeIsHidden=false&knob-inline=false&knob-corNormalizeToMat=true&knob-size&knob-iconIsLigature&knob-iconSetClass&knob-icon'));

  it('should render the component', () => {
    cy.get('cor-icon').should('exist');
  });
});
