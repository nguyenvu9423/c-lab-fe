import * as cherrio from 'cheerio/lib/static';
import { Slugify } from './Slugify';

class ArticleUtility {
  static markupContent(str) {
    const $ = cherrio.load(str);
    $('h2,h3,h4').each((index, element) => {
      const id = Slugify.heading($(element).text());
      $(element).prepend(
        `<span class="anchor-tag" id="${id}"><a href="#${id}">#</a></span>`
      );
    });
    return $.html();
  }

  static getContentTable(str) {
    const root = { parent: null, children: [], tagName: '' };
    let nearestNode = root;
    const $ = cherrio.load(str);
    $('h2,h3,h4').each((index, element) => {
      const id = Slugify.heading($(element).text());
      const node = {
        id,
        label: $(element).text(),
        tagName: element.tagName,
        children: []
      };
      if (node.tagName > nearestNode.tagName) {
        node.parent = nearestNode;
        nearestNode.children.push(node);
      } else {
        let currentNode = nearestNode;
        while (node.tagName <= currentNode.tagName && currentNode.parent) {
          currentNode = currentNode.parent;
        }
        node.parent = currentNode;
        currentNode.children.push(node);
      }
      nearestNode = node;
    });
    return root;
  }
}

export { ArticleUtility };
