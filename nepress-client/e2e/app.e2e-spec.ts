import { NepressClientPage } from './app.po';

describe('nepress-client App', () => {
  let page: NepressClientPage;

  beforeEach(() => {
    page = new NepressClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
