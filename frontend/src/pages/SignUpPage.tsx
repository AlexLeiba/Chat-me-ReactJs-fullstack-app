import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupSchema } from '../lib/zodSchemas';
import useAuthStore, { FormType } from '../store/useAuthStore';
import { Container, Row, Col } from '../components/UI/Grid';
import { Key, Mail, MessageCircleCode, User } from 'lucide-react';
import { cn } from '../lib/utils';

import { Input } from '../components/UI/Input/Input';
import { Spacer } from '../components/UI/spacer/spacer';
import { Button } from '../components/UI/Button/Button';
import { Link } from 'react-router-dom';

function SignUpPage() {
  const { isLoadingSignUp, signUp } = useAuthStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: FormType) {
    signUp(data);
  }

  return (
    <Container spacing='large'>
      <Row>
        <Col lg={6} lgOffset={3} md={2} mdOffset={1} sm={4}>
          <div className='text-center flex justify-center items-center flex-col'>
            <div className='flex justify-center items-center '>
              <div className='rounded-2xl bg-base-100/50 p-1 flex items-center justify-center'>
                <MessageCircleCode className='w-12 h-12 text-base-content ' />
                <p className=' text-l text-base-content'>{'{me}'}</p>
              </div>
            </div>
            <h2>Create Account</h2>
            <p>Get started with your account</p>
          </div>

          <Spacer size={6} />

          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              leftIcon={
                <User
                  className={cn([
                    'w-5 h-5',
                    errors.fullName?.message && 'text-red-500',
                  ])}
                />
              }
              label={'Full name'}
              error={errors.fullName?.message}
              {...register('fullName')}
              type={'text'}
              placeholder={'Your full name'}
              className={'grow'}
            />

            <Spacer size={4} />

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
                    errors.fullName?.message && 'text-red-500',
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
              disabled={isLoadingSignUp}
              loading={isLoadingSignUp}
              className='btn btn-primary w-full'
              type='submit'
              onClick={handleSubmit(onSubmit)}
            >
              <p className='text-lg'>Sign up</p>
            </Button>
          </form>

          <Spacer size={4} />

          <div className='flex justify-center items-center gap-2 text-center'>
            <p className='text-sm'>Already have an account?</p>
            <Link className=' underline ' to='/sign-in'>
              Sign in
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
