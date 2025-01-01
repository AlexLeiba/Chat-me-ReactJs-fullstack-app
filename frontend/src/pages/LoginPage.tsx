import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../lib/zodSchemas';
import useAuthStore, { FormType } from '../store/useAuthStore';
import { Container, Row, Col } from '../components/UI/Grid';
import { Key, Mail, MessageCircleCode } from 'lucide-react';
import { cn } from '../lib/utils';

import { Input } from '../components/UI/Input/Input';
import { Spacer } from '../components/UI/spacer/spacer';
import { Button } from '../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

function LoginPage() {
  const navigate = useNavigate();
  const { isLoadingSignIn, signIn } = useAuthStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });
  console.log('🚀 ~ LoginPage ~ errors:', errors, watch('email'));

  async function onSubmit(data: FormType) {
    console.log('🚀 ~ onSubmit ~ data:', data);
    await signIn(data);

    // If the sign-in request will fail, The middleware will make sure that user can't navigate to dashboard
    navigate('/');
  }
  return (
    <Container>
      <Row>
        <Col lg={6} lgOffset={3} md={2} mdOffset={1} sm={4}>
          <div className='text-center flex justify-center items-center flex-col'>
            <div className='flex justify-center items-center '>
              <div className='rounded-2xl bg-base-100/50 p-1 flex items-center justify-center'>
                <MessageCircleCode className='w-12 h-12 text-base-content ' />
                <p className=' text-l text-base-content'>{'{me}'}</p>
              </div>
            </div>
            <h2>Sign in</h2>
            <p>Sign in into your account</p>
          </div>

          <Spacer size={6} />

          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              className={''}
              leftIcon={
                <Mail
                  className={cn([
                    'w-5 h-5',
                    errors.email?.message && 'text-red-500',
                  ])}
                />
              }
              label={'Email'}
              error={errors.email?.message}
              {...register('email')}
              type='email'
              placeholder='Your email'
            />
            <Spacer size={4} />

            <Input
              leftIcon={
                <Key
                  className={cn([
                    'w-5 h-5',
                    errors.password?.message && 'text-red-500',
                  ])}
                />
              }
              label={'Password'}
              error={errors.password?.message}
              {...register('password')}
              type='password'
              inputType='password'
              className='relative'
              placeholder='password'
            />

            <Spacer size={6} />

            <Button
              disabled={isLoadingSignIn}
              loading={isLoadingSignIn}
              className='btn btn-primary w-full'
              type='submit'
              onClick={handleSubmit(onSubmit)}
            >
              <p className='text-lg'>Sign in</p>
            </Button>
          </form>

          <Spacer size={4} />

          <div className='flex justify-center items-center gap-2 text-center'>
            <p className='text-sm'>Do not have an account?</p>
            <Link className=' underline ' to='/sign-up'>
              Sign up
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
