import * as yup from 'yup';

export namespace UserFieldSchemas {
  export const username = yup
    .string()
    .required('Vui lòng điền tên đăng nhập')
    .min(8, 'Tên đăng nhập phải có ít nhất 8 kí tự')
    .max(24, 'Tên đăng nhập không được vượt quá 24 kí tự')
    .matches(
      /^(?![._])[a-zA-Z0-9._]+$/,
      'Tên đăng nhập chỉ có thể chứa các chữ cái, số, . và _. Kí tự đầu tiên phải là một chữ cái.'
    );

  export const password = yup
    .string()
    .required('Vui lòng điền mật khẩu')
    .min(8, 'Mật khẩu phải có ít nhất 8 kí tự')
    .max(24, 'Mật khẩu không được vượt quá 24 kí tự')
    .matches(
      /^[a-zA-Z0-9._!@#$%^&*-]+$/,
      'Mật khẩu chỉ có thứa các chữ cái, số và các kí tự đặc biệt: ._!@#$%^&*-'
    );

  export const firstName = yup
    .string()
    .required('Vui lòng điền tên')
    .min(2, 'Tên phải có ít nhất 2 kí tự')
    .max(24, 'Tên không được vượt quá 24 kí tự');

  export const lastName = yup
    .string()
    .required('Vui lòng điền họ')
    .min(2, 'Họ phải có ít nhất 2 kí tự')
    .max(24, 'Họ không được vượt quá 24 kí tự');

  export const email = yup
    .string()
    .required('Vui lòng điền email')
    .email('Email không hợp lệ');

  export const workplace = yup
    .string()
    .max(255, 'Nơi làm việc không được vượt quá 255 kí tự');
}
