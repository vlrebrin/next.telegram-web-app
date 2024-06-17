'use client'
import { Card, Text, CardHeader, CardBody, Spacer, Button, Spinner, Input, Link }
  from "@nextui-org/react";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/auth.buttons"
import { UseSession }  from "@/components/auth.user"

export default  function Home() {
  const text = "Server session."
  return (
    // <main
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "70vh",
    //   }}
    // >
    <Card>
      <UseSession/>
      <CardBody >
        <Spacer y={6}/>
        <LoginButton />
        <Spacer y={6}/>
        <RegisterButton />
        <Spacer y={6}/>
        <LogoutButton />
        <Spacer y={6}/>
        <ProfileButton />
      </CardBody>
    </Card>  
    // </main>
  );
}
