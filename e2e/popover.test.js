/* eslint-disable no-undef */
import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(50000);
describe('Credit Card Validator form', () => {
  let browser;
  let page;
  let server;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: 'new',
      // slowMo: 50,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('form should on page start', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.container');
  });

  test(
    'btn click add element tooltlip',
    async () => {
      await page.goto(baseUrl);
      await page.waitForSelector('.container');

      const btn = await page.$('.btn');

      await btn.click();

      await page.waitForSelector('.tooltlip');
      await page.waitForSelector('.btn.active');
    },
  );

  test(
    'btn click remove element tooltlip',
    async () => {
      await page.goto(baseUrl);
      await page.waitForSelector('.container');

      const btn = await page.$('.btn');

      await btn.click();
      await btn.click();
      await page.waitForSelector('.btn.inactive');
    },
  );
});
