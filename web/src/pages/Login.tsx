import React, { FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

import Modal, { ModalHandles } from '../components/Modal';
import { ButtonSecondary } from '../components/ButtonSecondary';
import { CreateUser } from '../components/CreateUser';
import { FormButton } from '../components/FormButton';
import { FormControl } from '../components/FormControl';
import { LinkPrimary } from '../components/LinkPrimary';
import {
  Wrapper,
  Container,
  Title,
  About,
  LoginBox,
  Form,
} from '../styles/login';
import { useRef } from 'react';
import { useCallback } from 'react';

const Login: React.FC = () => {
  document.title = 'Login | Valoriza';
  const history = useHistory();

  const { setUserToken, setCurrentUserId } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const { data } = await api.post('/login', {
        headers: { 'Content-Type': 'application/json' },
        email: formData.get('email'),
        password: formData.get('password'),
      });
      const { token, user } = data;
      setUserToken(token);
      setCurrentUserId(user.id);
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          token,
          id: user.id,
          created_at: Date.now(),
        })
      );

      history.push('/');
    } catch (error) {
      toast.error('Email ou senha incorretos!');

      if (error.message) {
        console.log(error.message);
      }
    }
  }

  const modalRef = useRef<ModalHandles>(null);
  const closeModal = useCallback(() => modalRef.current?.closeModal(), []);

  return (
    <Wrapper>
      <Container>
        <div>
          <Title>Valoriza</Title>
          <About>
            O Valoriza promove o reconhecimento entre os companheiros de equipe.
          </About>
        </div>

        <LoginBox>
          <Form onSubmit={handleSubmit}>
            <FormControl name="email" placeholder="Email" required />
            <FormControl
              name="password"
              placeholder="Senha"
              type="password"
              required
            />
            <FormButton>Entrar</FormButton>
            <LinkPrimary to="/forgot">Esqueceu sua senha?</LinkPrimary>
          </Form>
          <hr />
          <ButtonSecondary onClick={() => modalRef.current?.openModal()}>
            Criar nova conta
          </ButtonSecondary>
        </LoginBox>

        <Modal ref={modalRef}>
          <CreateUser closeModal={closeModal} />
        </Modal>
      </Container>
    </Wrapper>
  );
};

export default Login;
