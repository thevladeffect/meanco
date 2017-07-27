import { MeanCoPage } from './app.po';

describe('mean-co App', function() {
  let page: MeanCoPage;

  beforeEach(() => {
    page = new MeanCoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
