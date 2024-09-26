"use client";

import { usePathname } from 'next/navigation'
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  email: z
    .string(
      { required_error: "E-posta gereklidir" }
    )
    .email({
      message: "E-posta adresi geçersiz",
    })
    .toLowerCase(),
  password: z
    .string(
      { required_error: "Şifre gereklidir" }
    )
    .min(8, {
      message: "Şifre en az 8 karakter içermelidir."
    }),
})

const links = [
  {
    title: "Etkinlikler",
    href: "/etkinlikler",
    description: "",
  },
  {
    title: "Oyunlar",
    href: "",
    description: "",
    dropdown: true,
    items: [
      { title: "Oyun 1", href: "#", description: "", },
      { title: "Oyun 2", href: "#", description: "", },
      { title: "Oyun 3", href: "#", description: "", },
    ]
  },
  {
    title: "Destek",
    href: "/destek",
    description: "",
  },
];

const Nav = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('login');
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <nav className="sticky top-0">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Brand */}
        <Link href="/" className="uppercase text-3xl font-bold text-blue-600">NKUGAMES</Link>

        <div className="space-x-12">
          {
            links.map((link) => {
              if (link.dropdown) {
                return (
                  <DropdownMenu key={link.title}>
                    <DropdownMenuTrigger className="outline-none inline-flex items-center hover:text-blue-600 duration-300">
                      <span>{link.title}</span>

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Tüm oyunlar</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {
                        link.items.map((sublink) => {
                          return (
                            <Link href={sublink.href} key={sublink.title}><DropdownMenuItem> {sublink.title} </DropdownMenuItem></Link>
                          );
                        })
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              } else {
                return (
                  <Link href={link.href} key={link.title} className={`${pathname === link.href ? 'text-blue-600' : 'hover:text-blue-600'}` + " text-base font-medium duration-300"}> {link.title} </Link>
                );
              }
            })
          }

          <Dialog>
            <DialogTrigger className="py-2 px-6 rounded-full text-base font-medium text-white bg-blue-600 duration-300">
              Giriş yap
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className=''>
                  {activeTab === 'login' ? 'Tekrar hoşgeldin' : 'Hoşgeldin'}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
                  {/* TabsList login & register */}
                  <TabsList className="grid w-full grid-cols-2 h-fit">
                    <TabsTrigger value="login">Giriş yap</TabsTrigger>
                    <TabsTrigger value="register">Kayıt ol</TabsTrigger>
                  </TabsList>

                  {/* Login content */}
                  <TabsContent value="login">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-posta</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="nobody@example.com" {...field} />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Şifre</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-between items-center">
                          <div className="inline-flex items-center gap-1.5">
                            <FormControl>
                              <Checkbox name='remember' />
                            </FormControl>
                            <FormLabel>Beni hatırla</FormLabel>
                          </div>
                          <Link href={"/"} className='underline text-blue-600'>Şifremi unuttum</Link>
                        </div>

                        <Button type="submit">Giriş yap</Button>
                      </form>
                    </Form>
                  </TabsContent>

                  {/* Register content */}
                  <TabsContent value="register">Kayıt olma formunu buraya ekleyin.</TabsContent>
                </Tabs>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}

export default Nav;