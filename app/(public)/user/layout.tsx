import { Header } from "@/components/user";
import { loginIsRequiredServer } from "@/lib/auth";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await loginIsRequiredServer();
    return (
        <html lang="en">
            <body className="w-full h-full">
                <div className="flex flex-col h-screen marker:border-none w-full">
                    <div className="w-full bg-secondary-white py-1 border-secondary-black">
                        <Header />
                    </div>
                    <div className="flex-1 h-[calc(100vh-59px)]">{children}</div>
                </div>
            </body>
        </html>
    );
}
