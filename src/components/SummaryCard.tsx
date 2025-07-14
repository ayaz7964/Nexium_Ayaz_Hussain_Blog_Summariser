import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryCard({ summary }: { summary: string }) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>AI Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{summary}</p>
      </CardContent>
    </Card>
  );
}