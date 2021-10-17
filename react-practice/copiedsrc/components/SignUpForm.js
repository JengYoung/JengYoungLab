import React from 'react';
import Input from './Input';
import Button from './Button';
import useForm from '../hooks/useForm';
import ErrorText from './ErrorText';
import Title from './Title';
import CardForm from './CardForm';

const SignUpForm = ({ onSubmit }) => {
  const { errors, isLoading, handleChange, handleSubmit} = useForm({
    initialValues: { 
      name: '',
      password: '',
      passwordConform: '',
    },
    onSubmit,
    validate: ({ name, password, passwordConfirm }) => {
      const newErrors = {};
      if (!name) newErrors.name = '이름을 입력해주세요!';
      if (!password) newErrors.password = '비밀번호를 입력해주세요!';
      if (password !== passwordConfirm) newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다!'
      return newErrors;
    }
  });
  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>Sign Up</Title>
      <Input 
        type="text" 
        placeholder="Name" 
        name="name" 
        onChange={handleChange}
      />
      {errors.name && <ErrorText>{errors.name}</ErrorText> }
      <Input 
        type="password" 
        placeholder="Password" 
        name="password" 
        style={{ marginTop: 16 }} 
        onChange={handleChange}
      />
      {errors.password && <ErrorText>{errors.password}</ErrorText> }
      <Input 
        type="password" 
        placeholder="password Confirm" name="passwordConfirm" 
        style={{ marginTop: 16 }} 
        onChange={handleChange}
      />
      {errors.passwordConfirm && <ErrorText>{errors.passwordConfirm}</ErrorText> }
      <Button 
        type="submit" 
        disabled={isLoading} 
        style={{ marginTop: 16 }}
      >
        SignUp
      </Button>
    </CardForm>
  )
}

export default SignUpForm
