"use client";
import { Card, CardHeader, CardBody, Spacer, Button, Spinner, Input, Link } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
//import Link from "next/link";

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn()}
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
