import React from 'react';
import { Button, Header, Segment, Form } from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { FormErrorMessage } from '../common/FormErrorMessage';
import { ArticleService } from '../../service/ArticleService';

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title should be at last 3 characters'),
  content: yup.string().required('Content is required')
});

class BaseWriteArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditorBlur = this.handleEditorBlur.bind(this);
    this.ErrorMessage = this.ErrorMessage.bind(this);
  }

  handleEditorBlur(event, editor) {
    const { handleBlur, setValues, values } = this.props;
    setValues({ ...values, content: editor.getData() });
    handleBlur(event);
  }

  isValid() {
    return this.props.isValid;
  }

  ErrorMessage({ name }) {
    const { touched, errors } = this.props;
    if (touched[name]) {
      if (errors[name]) return <FormErrorMessage content={errors[name]} />;
    }
    return null;
  }

  render() {
    const {
      values,
      handleChange,
      handleSubmit,
      isValid,
      handleBlur,
      isSubmitting
    } = this.props;
    return (
      <Segment className={'clear-fix-container'}>
        <Header as={'h2'}>Write article</Header>
        <Form
          onSubmit={handleSubmit}
          error={!this.isValid()}
          loading={isSubmitting}
        >
          <Form.Field>
            <label>Title</label>
            <Form.Input
              type={'text'}
              name={'title'}
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <this.ErrorMessage name={'title'} />
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <CKEditor
              editor={ClassicEditor}
              disalbe={true}
              data={values.content}
              onBlur={this.handleEditorBlur}
            />
            <this.ErrorMessage name={'content'} />
          </Form.Field>
          <Button
            primary
            floated={'right'}
            type={'submit'}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      </Segment>
    );
  }
}

export let WriteArticleComponent = withFormik({
  mapPropsToValues: () => {
    return {
      title: '',
      content: ''
    };
  },
  handleSubmit: (values, bag) => {
    const { props } = bag;
    const { onCreateArticleSuccess } = props;
    ArticleService.createArticle(values)
      .then(res => {
        const { data: article } = res;
        if (onCreateArticleSuccess) onCreateArticleSuccess(article);
        bag.setSubmitting(false);
      })
      .catch(error => {
        console.log(error);
      });
  },
  validationSchema
})(BaseWriteArticleComponent);
