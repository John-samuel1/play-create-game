import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-xl px-4 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold">الرئيسية</h1>
          <p className="text-muted-foreground">اختر وضعية اللعب</p>
        </header>

        <div className="space-y-4">
          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <Button asChild size="lg" className="w-full h-16 rounded-lg text-lg">
                <a href="/book">تحدي الكتاب</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <Button asChild variant="secondary" size="lg" className="w-full h-16 rounded-lg text-lg">
                <a href="/one-by-three">تحدي 1×3</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Index;
