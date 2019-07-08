import slugify from 'slugify';

class Slugify {
  static heading(str, suffix = '') {
    let slug = slugify(str).substring(0, 256);
    if (suffix) return slug + '-' + suffix;
    return slug;
  }
}

export { Slugify };
