import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
const plugins = {dvr: validatorjs};

const fields = {
  email: {
    label: 'Email',
    rules: 'required|email|string|between:5,25',
  },
  password: {
    label: 'Password',
    rules: 'required|string|between:5,25',
  },
};

class LoginForm extends MobxReactForm {
  onSuccess(form) {
    console.log('Form Values!', form.values());
  }
  onError(form) {
    console.log('All form errors', form.errors());
    form.invalidate('This is a generic error message!');
  }
}
export default new LoginForm({fields, plugins});


