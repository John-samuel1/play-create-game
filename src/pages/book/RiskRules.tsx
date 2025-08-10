import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const RiskRules = () => {
  return (
    <main className="container max-w-2xl py-8">
      <SEO title="تحدي الكتاب | ريسك" description="تعليمات لعبة ريسك: اختر تصنيفًا وأضف 5/10/20/40 نقطة لكل إجابة صحيحة خلال الوقت!" canonical="/book/risk" />
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold">تحدي الكتاب</h1>
      </header>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-primary">ريسك</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 leading-8">
          <p>
            كل فريق يختار سؤالًا من الأسئلة المتبقية داخل تصنيفات متنوعة من الكتاب المقدس (زي: شخصيات، آيات، معجزات، أحداث... إلخ).
          </p>
          <p>كل سؤال له عدد معين من النقاط حسب مستوى الصعوبة:</p>
          <ul className="list-disc pr-6 space-y-1">
            <li>5 نقاط: سهل جدًا</li>
            <li>10 نقاط: متوسط</li>
            <li>20 نقطة: صعب</li>
            <li>40 نقطة: صعب جدًا جدًا</li>
          </ul>
          <p>الفريق يكسب النقاط إذا جاوب صح، ومفيش خصم في حالة الخطأ.</p>
          <p>في نهاية اللعبة، الفريق اللي مجموع نقاطه أعلى هو الفايز!</p>

          <div className="pt-2">
            <Button asChild size="lg" className="w-full h-12 rounded-lg">
              <a href="/book/risk/play">ابدأ اللعب</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default RiskRules;
