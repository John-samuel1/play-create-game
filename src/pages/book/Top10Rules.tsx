import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const Top10Rules = () => {
  return (
    <main className="container max-w-3xl py-6">
      <SEO title="تحدي الكتاب | توب 10 (القواعد)" description="قواعد لعبة توب 10 وطريقة حساب النقاط." canonical="/book/top10" />

      <header className="mb-4 text-center space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold">توب 10</h1>
        <p className="text-muted-foreground">اقرأ القواعد ثم ابدأ اللعب</p>
      </header>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>قواعد اللعبة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            يتم عرض جدول فيه ترتيب لعشر إجابات صحيحة ضمن تصنيف معين. الفريقان يتناوبان في محاولة ذكر إجابة من الإجابات الموجودة.
          </p>
          <div className="space-y-1">
            <p>طريقة النقاط حسب الترتيب:</p>
            <ul className="list-disc pr-6 space-y-1 text-muted-foreground">
              <li>المركز العاشر = 10 نقاط</li>
              <li>المركز الأول = نقطة واحدة فقط</li>
            </ul>
          </div>
          <p>
            عند حصول 3 إجابات خاطئة متتالية من الفريق نفسه، يمكن للحكم تقديم «كلو/دليل» للفريق الآخر. تنتهي الجولة عندما يقرر الحكم أو بعد عدد أدلة مناسب.
          </p>

          <Button asChild size="lg" className="mt-2">
            <a href="/book/top10/play">ابدأ اللعب</a>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Top10Rules;
