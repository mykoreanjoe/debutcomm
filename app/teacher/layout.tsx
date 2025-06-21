import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TeacherLayoutProps {
    children: ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header /> 
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
} 