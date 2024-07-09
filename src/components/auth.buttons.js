//"use client";
import { Button } from "@nextui-org/button";
import { color } from "framer-motion";
 import { signIn, signOut } from "next-auth/react";
import { Content } from "next/font/google";
//import { signIn, signOut }  from "@/auth";
import { useRouter } from 'next/navigation'
import { useFormStatus } from "react-dom"
//import Link from "next/link";




export const LoginButton = () => {
  return (
    <Button
      onClick={() => signIn()}
      type="submit" color="primary"
      fullWidth
      size="lg"
     >
      Login
    </Button>
  );
};


export const RegisterButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push('/register')}
      type="submit" color="primary"
      fullWidth
      size="lg"
    >
      Register
    </Button>
  );
};

// export const RegisterButton = () => {
//   return (
//     <Link href="/register" style={{ marginRight: 10 }}>
//       Register
//     </Link>
//   );
// };

export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()}
      type="submit" color="primary"
      fullWidth
      size="lg"
      >
      Logout
    </Button>
  );
};

// export const ProfileButton = () => {
//   return <Link href="/profile">Profile</Link>;
// };

export const ProfileButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push('/profile')}
      type="submit" color="primary"
      fullWidth
      size="lg"
    >
      Profile
    </Button>
  );
};

export function PendingButton(props) {
  const { pending } = useFormStatus()
  //isLoading = {"true"} 
  //props.color = "danger"
  return (
    <Button
      isLoading={pending}
      {...props}  ></Button>
  )
}
