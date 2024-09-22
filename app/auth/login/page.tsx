"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/verificationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await axios.post("/api/auth/login", { ...values });

      localStorage.setItem("token", res.data.data.token);

      toast({
        title: "User logged in Successfully",
      });

      router.push("/u");
    } catch (error) {
      console.log();
      toast({
        title: error?.response?.data.message || "Error logging in User",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            {" "}
            Enter your credentials login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" type="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full justify-self-end mt-10 ">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-center mt-1 text-sm leading-5  ">
            Don't have a account?{" "}
            <Link href={"/auth/sign-up"}>
              <span className="font-semibold hover:text-primary underline cursor-pointer">
                signup
              </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

// <div className="w-full h-screen bg-gray-700 flex items-center justify-center">
// <div className="w-full max-w-md  bg-white rounded-md drop-shadow p-6">
//   <h1 className="text-4xl text-black font-bold text-center tracking-tight">
//     Login
//   </h1>
//   <p className="text-center mt-3.5 text-base leading-5  text-slate-500">
//     Enter your credentials login to your account
//   </p>

//   <div className=" my-5">
// <Form {...form}>
//   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//     <FormField
//       control={form.control}
//       name="email"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Email</FormLabel>
//           <FormControl>
//             <Input placeholder="email" type="email" {...field} />
//           </FormControl>

//           <FormMessage />
//         </FormItem>
//       )}
//     />

//     <FormField
//       control={form.control}
//       name="password"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Password</FormLabel>
//           <FormControl>
//             <Input
//               placeholder="password"
//               type="password"
//               {...field}
//             />
//           </FormControl>

//           <FormMessage />
//         </FormItem>
//       )}
//     />

//     <Button type="submit" className="w-full justify-self-end mt-10 ">
//       Create Account
//     </Button>
//   </form>
// </Form>
//   </div>
// <p className="text-center mt-1 text-sm leading-5  text-slate-500">
//   Don't have a account?{" "}
//   <Link href={"/sign-up"}>
//     <span className="font-semibold hover:text-primary underline cursor-pointer">
//       sign-up
//     </span>
//   </Link>
// </p>
// </div>
// </div>
