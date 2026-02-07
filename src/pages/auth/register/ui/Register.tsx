import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { RegisterForm } from "./RegisterForm";

export const Register = () => {
    const handleSuccess = () => {
        // redirect or msg
        console.log("Registration successful!");
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-5">
            {/* Register Section */}
            <section className="grid lg:grid-cols-2 gap-12 items-center pt-10">
                {/* Left Column */}
                <div className="space-y-6 text-center lg:text-left order-last lg:order-first">
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50/50">
                        Student Portal
                    </Badge>
                    <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                        Join <span className="text-blue-600">John Doe's</span> Exclusive Learning Community
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Create your student account to access premium course materials,
                        track your progress, and schedule one-on-one sessions.
                    </p>
                </div>

                {/* Right Column: Register Form */}
                <div className="w-full max-w-md mx-auto">
                    <Card className="border-slate-100 shadow-2xl shadow-blue-100/50">
                        <CardHeader>
                            <CardTitle className="text-2xl">Create Account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RegisterForm onSuccess={handleSuccess} />
                            
                            <div className="mt-4 text-center text-sm text-slate-500">
                                Already have an account?{" "}
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors">
                                    Login
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* --- Simple Footer --- */}
            <footer className="pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm">
                <p>© 2026 John Doe Education. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-blue-600 transition-colors">Resources</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
                </div>
            </footer>
        </div>
    );
};