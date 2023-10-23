import {RegisterOptions} from 'react-hook-form';

const validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

interface Rules {
  email: RegisterOptions;
  password: RegisterOptions;
}

const rules: Rules = {
  email: {
    required: 'Email tidak boleh kosong',
    minLength: {
      value: 5,
      message: 'Email panjang minimal 5 karakter!',
    },
    pattern: {
      value: validEmail,
      message: 'Format email harus benar!',
    },
  },
  password: {
    required: 'Password tidak boleh kosong',
    pattern: {
      value: validPassword,
      message:
        'Password harus berisi setidaknya satu angka, satu simbol, satu huruf besar dan kecil, dan panjang minimal 8 karakter',
    },
  },
};

export {validPassword, validEmail, rules};
