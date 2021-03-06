import React, { FormEvent } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

import { ButtonSecondary } from '../ButtonSecondary';
import { FormControl } from '../FormControl';
import { Form } from './styles';

type CreateUserProps = { closeModal: () => void };

const CreateUser: React.FC<CreateUserProps> = ({ closeModal }) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await api.post('/users', {
        name,
        email,
        password,
      });
      closeModal();
      toast.success('Conta criada! Faça seu login!');
    } catch (error) {
      toast.error('Usuário já registrado.');
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Cadastre-se</h2>
      <FormControl placeholder="Nome" name="name" required />
      <FormControl placeholder="Email" name="email" required />
      <FormControl
        placeholder="Senha"
        name="password"
        type="password"
        required
      />
      <ButtonSecondary type="submit">Cadastre-se</ButtonSecondary>
    </Form>
  );
};

export { CreateUser };
