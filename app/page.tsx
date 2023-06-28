"use client";

import { Database } from "@/types/supabase";
import { Button, Flex, Text } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Home() {

  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const email = "martin0044@gmail.com"
  const password = "example-password"

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    console.log(data)
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log(data)
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const handleSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    console.log(data)
  }

  

  return (
    <Flex
      mt={"50px"}
      textAlign={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Text>hello World</Text>
      <Button onClick={handleSignUp}>Sign up</Button>
      <Button onClick={handleSignIn}>Sign in</Button>
      <Button onClick={handleSignOut}>Sign out</Button>
      <Button onClick={handleSession}>Get Session</Button>
    </Flex>
  );
}
