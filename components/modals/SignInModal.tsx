'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import Modal from '@/components/modals/Modal';
import { authClient } from '@/lib/auth-client';
import { useModalStore } from '@/store/useModalStore';

const SignInModal = () => {
  const { isSignInOpen, closeSignIn } = useModalStore();

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  const signInWithGitHub = async () => {
    await authClient.signIn.social({
      provider: 'github',
    });
  };

  return (
    <Modal
      isOpen={isSignInOpen}
      onClose={closeSignIn}
    >
      <h2 className='mb-2 text-xl font-semibold text-white'>
        Sign in to Tech<span className='text-primary'>Blog</span>
      </h2>

      <p className='mb-8 text-sm text-gray-400'>
        Continue with one of the providers
      </p>

      <div className='space-y-4'>
        {/* Google */}
        <button
          onClick={signInWithGoogle}
          className='flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-white py-3 font-medium text-black transition hover:bg-gray-200'
        >
          <FcGoogle className='text-xl' />
          Continue with Google
        </button>

        <button
          onClick={signInWithGitHub}
          className='bg-hover flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-white/10 py-3 font-medium text-white transition hover:bg-[#202020]'
        >
          <FaGithub className='text-xl' />
          Continue with GitHub
        </button>
      </div>

      <p className='mt-8 text-center text-xs text-gray-500'>
        By continuing you agree to our Terms & Privacy Policy
      </p>
    </Modal>
  );
};

export default SignInModal;
