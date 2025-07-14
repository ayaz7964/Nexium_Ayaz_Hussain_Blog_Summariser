import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UrduTranslation({ urdu }: { urdu: string }) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Urdu Translation</CardTitle>
      </CardHeader>
      <CardContent>
        <p dir="rtl" lang="ur">{urdu}</p>
      </CardContent>
    </Card>
  );
}

