import LoginForm from '../components/LoginForm';

export default {
  title: 'Component/LoginForm',
  component: LoginForm,
};


const Template = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});

