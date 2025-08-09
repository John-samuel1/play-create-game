import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const BankRules = () => {
  return (
    <main className="container max-w-2xl py-8">
      <SEO title="تحدي الكتاب | بنك" description="تعليمات لعبة بنك: جاوب صح وخزن نقاطك في الوقت المناسب!" canonical="/book/bank" />
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold">تحدي الكتاب</h1>
      </header>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">بنك</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 leading-8">
          <p>
            اللعبة مكوّنة من جولة بها 12 سؤال يجب الإجابة عليهم في دقيقتين.
            كل إجابة صحيحة تضيف نقاطًا تتضاعف كالتالي: 1 ثم 2 ثم 4 ثم 8 ...
          </p>
          <p>
            بعد كل سؤال لديك خياران:
          </p>
          <ol className="list-decimal pr-6 space-y-2">
            <li>
              تقول "بنك": أي تخزن النقاط الحالية في رصيد فريقك بأمان وتبدأ من صفر في السؤال التالي.
            </li>
            <li>
              تكمل من غير بنك: لكن لو جاوبت غلط تضيع النقاط غير المخزنة.
            </li>
          </ol>

          <div className="pt-2">
            <Button asChild size="lg" className="w-full h-12 rounded-lg">
              <a href="/book/bank/play">ابدأ اللعب</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default BankRules;
