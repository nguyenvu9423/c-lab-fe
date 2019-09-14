import * as cherrio from 'cheerio/lib/static';
import { Slugify } from './Slugify';

class ArticleUtility {
  static markupContent(str) {
    const $ = cherrio.load(str);
    $('h1,h2,h3').each((index, element) => {
      const id = Slugify.heading($(element).text());
      $(element).prepend(`<span class="anchor-tag" id="${id}"/>`);
    });
    return $.html();
  }

  static getContentTable(str) {
    const table = [];
    const $ = cherrio.load(str);
    $('h1,h2,h3').each((index, element) => {
      const id = Slugify.heading($(element).text());
      table.push({
        id,
        label: $(element).text(),
        level: parseInt(element.tagName.substring(1)) - 1
      });
    });
    return JSON.stringify(table);
  }
}

export { ArticleUtility };
