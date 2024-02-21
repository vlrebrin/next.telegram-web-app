'use client'
import { Card, Text, CardHeader, CardBody, Spacer, Button, Spinner, Input, Link }
  from "@nextui-org/react";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/auth.buttons"
import { User } from "@/components/auth.user"

export default function Home() {
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
    <CardBody className="flex" >
        <Spacer y={6}/>
        <LoginButton />
        <Spacer y={6}/>
        <RegisterButton />
        <Spacer y={6}/>
        <LogoutButton />
        <Spacer y={6}/>
        <ProfileButton />
        
        {/* <Text h1>{text}</Text> */}
        {/* <Text b>{JSON.stringify(session)}</Text> */}

        <User />


      </CardBody>
    </Card>  
    // </main>
  );
}
