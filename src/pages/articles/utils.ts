import * as cherrio from 'cheerio';
import slugify from 'slugify';

export namespace ArticleUtils {
  export function markupContent(str: string): string {
    const $ = cherrio.load(str);
    $('h2,h3,h4').each((index, element) => {
      const id = slugifyHeading($(element).text());
      $(element).prepend(
        `<span class="anchor-tag" id="${id}"><a href="#${id}">#</a></span>`,
      );
    });
    return $.html();
  }
}

export function slugifyHeading(str: string, suffix = ''): string {
  const slug = slugify(str.substring(0, 256));
  if (suffix) return slug + '-' + suffix;
  return slug;
}
