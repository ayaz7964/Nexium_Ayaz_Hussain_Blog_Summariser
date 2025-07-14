import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogForm from "@/components/BlogForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Blog Summariser</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogForm />
        </CardContent>
      </Card>
    </main>
  );
}