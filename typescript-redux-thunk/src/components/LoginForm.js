import React from 'react';
import Input from './Input';
import Button from './Button';
import useForm from '../hooks/useForm';
import ErrorText from './ErrorText';
import Title from './Title';
import CardForm from './CardForm';

const LoginForm = ({ onSubmit }) => {
  const { values, errors, isLoading, handleChange, handleSubmit} = useForm({
    initialValues: { 
      name: '',
      password: '',
    },
    onSubmit,
    validate: ({ name, password }) => {
      const newErrors = {};
      if (!name) newErrors.name = '이름을 입력해주세요!';
      if (!password) newErrors.password = '비밀번호를 입력해주세요!';
      return newErrors;
    }
  });
  
  console.log(values, errors)

  return (
    <CardForm onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input type="text" placeholder="Name" name="name" onChange={handleChange}/>
      {errors.name && <ErrorText>{errors.name}</ErrorText> }
      <Input type="password" placeholder="Password" name="password" style={{ marginTop: 16 }} onChange={handleChange}/>
      {errors.password && <ErrorText>{errors.password}</ErrorText> }
      <Button type="submit" disabled={isLoading} style={{ marginTop: 16 }}>Login</Button>
    </CardForm>
  )
}

export default LoginForm
