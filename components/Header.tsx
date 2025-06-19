"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: '데뷰 스토리', href: '/story' },
        { name: '커리큘럼', href: '/curriculum' },
        { name: '시간표', href: '/timetable' },
        { name: 'NEWS & Events', href: '/news' },
        { name: '학부모 후기', href: '/reviews' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsOpen(false); 
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHomePage = pathname === '/';

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold">
                            <span className={isScrolled ? 'text-gray-800' : 'text-white'}>데뷰</span>
                            <span className="text-blue-500">영어</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={`text-base font-medium transition-colors duration-300 ${isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'}`}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className={`text-sm font-medium px-4 py-2 rounded-md transition-colors duration-300 ${isScrolled || !isHomePage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                                    로그인
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className={`focus:outline-none ${isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'}`}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 shadow-lg absolute top-full left-0 w-full">
                    <div className="px-5 pt-2 pb-5 space-y-3">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block text-gray-800 font-semibold py-2 hover:text-blue-600 border-b border-gray-200/80">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="px-5 pb-5 mt-4 space-y-3">
                         <SignedOut>
                            <SignInButton mode="modal">
                                <button className="w-full text-center bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                    로그인
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="w-full text-center bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                    회원가입
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex flex-col items-center space-y-4">
                               <p className="text-gray-700">환영합니다!</p>
                               <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header; 