"use client";

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

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

const loginFormScheme = z.object({
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

const registerFormScheme = z.object({
    name: z
        .string({ required_error: "Ad gereklidir" })
        .min(3, { message: "Ad en az 3 karakter içermelidir." }),
    surname: z
        .string({ required_error: "Soyad gereklidir" })
        .min(2, { message: "Soyad en az 2 karakter içermelidir." }),
    email: z
        .string({ required_error: "E-posta gereklidir" })
        .email({ message: "E-posta adresi geçersiz", })
        .toLowerCase(),
    password: z
        .string({ required_error: "Şifre gereklidir" })
        .min(8, { message: "Şifre en az 8 karakter içermelidir." }),
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
    const loginForm = useForm<z.infer<typeof loginFormScheme>>({
        resolver: zodResolver(loginFormScheme),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const registerForm = useForm<z.infer<typeof registerFormScheme>>({
        resolver: zodResolver(registerFormScheme),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    function onLoginSubmit(values: z.infer<typeof loginFormScheme>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await fetch('http://localhost:8000/api/csrf-token');
            if (response.ok) {
                const data = await response.json();
                setCsrfToken(data.csrf_token);
            }
        };

        fetchCsrfToken();
    }, []);

    async function onRegisterSubmit(values: z.infer<typeof registerFormScheme>) {
        console.log(values);  // Form verilerini kontrol et

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify(values),
        });

        const data = await response.text();

        console.log(data);
    }

    return (
        <nav className="sticky top-0">
            { csrfToken }
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
                        <DialogContent aria-describedby="Kullanıcı kayıt ve giriş formu">
                            <DialogHeader>
                                <DialogTitle className=''>
                                    {activeTab === 'login' ? 'Tekrar hoşgeldin' : 'Hoşgeldin'}
                                </DialogTitle>
                            </DialogHeader>
                            <DialogDescription></DialogDescription>
                            <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
                                {/* TabsList login & register */}
                                <TabsList className="grid w-full grid-cols-2 h-fit">
                                    <TabsTrigger value="login">Giriş yap</TabsTrigger>
                                    <TabsTrigger value="register">Kayıt ol</TabsTrigger>
                                </TabsList>

                                {/* Login content */}
                                <TabsContent value="login">
                                    <Form {...loginForm}>
                                        <form method="POST" onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-2">
                                            <FormField
                                                control={loginForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>E-posta</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="nobody@example.com" {...field} autoComplete='on' />
                                                        </FormControl>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Şifre</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="********" {...field} autoComplete='on' />
                                                        </FormControl>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <span className="flex justify-between items-center">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <FormControl>
                                                        <Checkbox name='remember' />
                                                    </FormControl>
                                                    <FormLabel>Beni hatırla</FormLabel>
                                                </span>
                                                <Link href={"/"} className='underline text-blue-600'>Şifremi unuttum</Link>
                                            </span>

                                            <Button type="submit">Giriş yap</Button>
                                        </form>
                                    </Form>
                                </TabsContent>

                                {/* Register content */}
                                <TabsContent value="register">
                                    <Form {...registerForm}>
                                        <form method="POST" onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-2">
                                            <FormField
                                                control={registerForm.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Ad</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="John" {...field} autoComplete='on' />
                                                        </FormControl>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={registerForm.control}
                                                name="surname"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Soyad</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="Doe" {...field} autoComplete='on' />
                                                        </FormControl>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={registerForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>E-posta</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="nobody@example.com" {...field} autoComplete='on' />
                                                        </FormControl>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={registerForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Şifre</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="********" {...field} autoComplete='off' />
                                                        </FormControl>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit">Kayıt ol</Button>
                                        </form>
                                    </Form>
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </nav>
    );
}

export default Nav;