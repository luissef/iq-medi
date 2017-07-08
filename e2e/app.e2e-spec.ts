import { IqmediPage } from './app.po';

describe('iqmedi App', () => {
  let page: IqmediPage;

  beforeEach(() => {
    page = new IqmediPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
