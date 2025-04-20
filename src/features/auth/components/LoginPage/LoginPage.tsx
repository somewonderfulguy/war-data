import Image from 'next/image'
import { LoginForm } from '../LoginForm'
import img from './assets/donets.jpg'

export const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LoginForm />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={img}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale-50"
          priority
          fill
          sizes="h-full"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
