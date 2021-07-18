import * as cherrio from 'cheerio';
import slugify from 'slugify';

export namespace ArticleUtils {
  export function markupContent(str: string): string {
    const $ = cherrio.load(str);
    $('h2,h3,h4').each((index, element) => {
      const id = slugifyHeading($(element).text());
      $(element).prepend(
        `<span class="anchor-tag" id="${id}"><a href="#${id}">#</a></span>`
      );
    });
    return $.html();
  }

  export function getContentTable(str: string): ContentTable.RootNode {
    const result: ContentTable.RootNode = { parent: null, children: [] };
    let nearestNode: ContentTable.Node = result;
    const $ = cherrio.load(str);
    $('h2,h3,h4').each((index, element) => {
      const id = slugifyHeading($(element).text());
      if (element.type !== 'tag') return;
      let parentNode: ContentTable.Node | undefined;

      if (
        nearestNode.tagName === undefined ||
        element.tagName > nearestNode.tagName
      ) {
        parentNode = nearestNode;
      } else {
        let currentNode: ContentTable.Node | undefined = nearestNode;
        while (currentNode) {
          if (
            currentNode.tagName === undefined ||
            element.tagName > currentNode.tagName
          ) {
            break;
          }
          currentNode = currentNode.parent ?? undefined;
        }
        if (!currentNode) {
          throw new Error();
        }
        parentNode = currentNode;
      }

      const node: ContentTable.HeaderNode = {
        id,
        parent: parentNode,
        label: $(element).text(),
        tagName: element.tagName,
        children: [],
      };
      parentNode.children.push(node);
      nearestNode = node;
    });
    return result;
  }
}

export namespace ContentTable {
  export type Node = RootNode | HeaderNode;

  export interface BaseNode {
    parent: Node | null;
    children: Node[];
    tagName?: string;
  }

  export interface RootNode extends BaseNode {
    parent: null;
    children: Node[];
  }

  export interface HeaderNode extends BaseNode {
    id: string;
    parent: Node;
    children: Node[];
    label: string;
    tagName: string;
  }
}

function slugifyHeading(str: string, suffix = ''): string {
  const slug = slugify(str).substring(0, 256);
  if (suffix) return slug + '-' + suffix;
  return slug;
}
