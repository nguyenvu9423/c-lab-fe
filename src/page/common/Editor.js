import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapterPlugin from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImagePlugin from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
import ImageCaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import { serverPath } from '../../server';

class Editor extends ClassicEditorBase {}

Editor.builtinPlugins = [
  EssentialsPlugin,
  UploadAdapterPlugin,
  AutoformatPlugin,
  BoldPlugin,
  ItalicPlugin,
  BlockQuotePlugin,
  EasyImagePlugin,
  HeadingPlugin,
  ImagePlugin,
  ImageCaptionPlugin,
  ImageStylePlugin,
  ImageToolbarPlugin,
  ImageUploadPlugin,
  LinkPlugin,
  ListPlugin,
  ParagraphPlugin,
  CKFinder
];

Editor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'ckfinder',
      'imageUpload',
      'blockQuote',
      'undo',
      'redo'
    ]
  },
  image: {
    toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
  },
  language: 'en',
  ckfinder: {
    options: {
      connectorPath: serverPath.resolve('/ckfinder/connector')
    },
    uploadUrl: serverPath.resolve(
      'ckfinder/connector?command=QuickUpload&type=Files&responseType=json'
    )
  },
  heading: {
    options: [
      {
        model: 'heading1',
        view: {
          name: 'h2',
          classes: ['ui', 'dividing', 'header']
        },
        title: 'Heading 1'
      },
      {
        model: 'heading2',
        view: {
          name: 'h3'
        },
        title: 'Heading 2'
      },
      {
        model: 'heading3',
        view: {
          name: 'h4'
        },
        title: 'Heading 3'
      },

      { model: 'paragraph', title: 'Paragraph' }
    ]
  }
};

export { Editor };
