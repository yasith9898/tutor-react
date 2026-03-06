import { Link } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

export const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full text-center space-y-6 p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-center">
                    <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-10 w-10 text-slate-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">404</h1>
                    <h2 className="text-xl font-semibold text-slate-700">Page Not Found</h2>
                    <p className="text-slate-500">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
