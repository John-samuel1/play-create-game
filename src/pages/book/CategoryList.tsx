import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const categories = [
  { key: "bank", title: "بنك", href: "/book/bank", active: true },
  { key: "risk", title: "ريسك", href: "/book/risk", active: true },
  { key: "top10", title: "توب 10", href: "#", active: false },
  { key: "truefalse", title: "اهبد صح", href: "#", active: false },
  { key: "acting", title: "تمثيل", href: "#", active: false },
  { key: "whoami", title: "أنا مين", href: "#", active: false },
];

const CategoryList = () => {
  return (
    <main className="container max-w-2xl py-8">
      <SEO title="تحدي الكتاب | التصنيفات" description="اختر تصنيف اللعبة: بنك، ريسك، توب 10 وغيرها." canonical="/book" />
      <header className="mb-6 text-center space-y-1">
        <h1 className="text-3xl font-extrabold">تحدي الكتاب</h1>
        <p className="text-muted-foreground">اختر نوع التحدي</p>
      </header>

      <div className="space-y-4">
        {categories.map((c) => (
          <Card key={c.key} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-primary">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {c.active ? (
                <Button asChild className="w-full h-12 rounded-lg">
                  <a href={c.href}>افتح التعليمات</a>
                </Button>
              ) : (
                <Button variant="secondary" className="w-full h-12 rounded-lg" disabled>
                  قريبًا
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default CategoryList;
