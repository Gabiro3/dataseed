import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Logo from '../../../public/images/Dataseed logo.svg';

export const metadata: Metadata = {
  title: 'Dataseed Africa',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>

      {/* Background div with farmer image */}
      <div
        className="relative hidden h-full flex-col bg-cover bg-center p-10 text-white lg:flex dark:border-r"
        style={{ backgroundImage: 'url(/images/farmer.jpg)' }}
      >
        <div className="absolute inset-0 bg-zinc-900/50" />{' '}
        {/* semi-transparent overlay */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src={Logo} // Path to your logo
            alt="Dataseed Logo" // Provide an alt text for accessibility
            className="mr-2 h-6 w-6" // Adjust height and width as needed
            width={24} // Specify width for Image component
            height={24} // Specify height for Image component
          />
          Dataseed
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Dataseed Africa is Africa&apos;s largest agriculture
              dataset with information ranging from farm status, farmers
              information, agricultural supply chains and so much more.&rdquo;
            </p>
            <footer className="text-sm">Gabiro Arnauld</footer>
          </blockquote>
        </div>
      </div>

      {/* Authentication form */}
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
