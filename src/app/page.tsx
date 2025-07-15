import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogForm from "@/components/BlogForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-100 flex flex-col items-center justify-center ">
      <div className="text-center m-20">
        <h1 className="text-8xl font-bold mb-6">Blog Summariser</h1>
        <p className="text-7xl text-center mb-12">
          Summarize any blog post <span className="text-blue-800"> in seconds </span> and get translations in Urdu.
        </p>
      </div>


      <BlogForm />
      {/* Add more components or features as needed */}


    </main>
  );
}