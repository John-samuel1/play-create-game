import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";

const Setup = () => {
  return (
    <main className="container max-w-2xl py-8">
      <SEO title="تحدي 1×3 | الإعداد" description="أدخل أسماء اللاعبين وابدأ التحدي." canonical="/one-by-three" />
      <header className="mb-6 text-center space-y-1">
        <h1 className="text-3xl font-extrabold">تحدي 1×3</h1>
        <p className="text-muted-foreground">أدخل أسماء اللاعبين</p>
      </header>

      <div className="space-y-4">
        {["اللاعب الأول", "اللاعب الثاني", "اللاعب الثالث"].map((placeholder, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground">{placeholder}</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder={placeholder} />
            </CardContent>
          </Card>
        ))}

        <Button className="w-full h-12 rounded-lg" disabled>
          ابدأ اللعبة (قريبًا)
        </Button>
      </div>
    </main>
  );
};

export default Setup;
