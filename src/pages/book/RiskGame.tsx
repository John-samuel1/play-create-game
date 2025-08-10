import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

const toMMSS = (s: number) => {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(1, "0");
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
};

const CATEGORIES = [
  "كريستيانو رونالدو",
  "كأس الأمم الأوروبية",
  "أرقام اللاعبين",
  "مدربين",
];

const RiskGame = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // 45 ثانية
  const intervalRef = useRef<number | null>(null);

  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ team1: 0, team2: 0 });

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(intervalRef.current!);
          setIsRunning(false);
          toast("انتهى الوقت!", { description: "احسبوا النقاط" });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const addPoints = (pts: number) => {
    setScores((s) => {
      const key = activeTeam === 1 ? "team1" : "team2";
      return { ...s, [key]: s[key] + pts } as typeof s;
    });
  };

  const resetAll = () => {
    setTimeLeft(45);
    setIsRunning(false);
    setScores({ team1: 0, team2: 0 });
  };

  return (
    <main className="container max-w-3xl py-6">
      <SEO title="تحدي الكتاب | ريسك (اللعب)" description="وضع اللعب لريسك مع مؤقت 45 ثانية وصندوق نقاط للفريقين." canonical="/book/risk/play" />

      <header className="mb-4 text-center space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold">ريسك</h1>
        <p className="text-muted-foreground">اختر تصنيفًا وأضف النقاط</p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>المؤقت</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge className="text-lg px-3 py-1">{toMMSS(timeLeft)}</Badge>
              <div className="text-sm text-muted-foreground">الوقت</div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setIsRunning(true)} disabled={isRunning}>بدء</Button>
              <Button className="flex-1" variant="secondary" onClick={() => setIsRunning(false)} disabled={!isRunning}>إيقاف</Button>
              <Button className="flex-1" variant="outline" onClick={() => setTimeLeft(45)}>إعادة</Button>
            </div>
            <Button variant="ghost" className="w-full" onClick={resetAll}>إعادة ضبط النقاط والمؤقت</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>التصنيفات</span>
              <Button size="sm" variant="ghost" onClick={() => setActiveTeam((t) => (t === 1 ? 2 : 1))}>
                تبديل الدور: الفريق {activeTeam === 1 ? "الأول" : "الثاني"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {CATEGORIES.map((cat) => (
              <Card key={cat} className="">
                <CardHeader className="pb-2 flex-row items-center justify-between">
                  <CardTitle className="text-base md:text-lg">{cat}</CardTitle>
                  <Button size="icon" variant="outline" onClick={() => toast("تمت إعادة تعيين القسم")}
                    aria-label={`إعادة ${cat}`}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[5, 10, 20, 40].map((p) => (
                    <Button key={p} className="h-12" onClick={() => addPoints(p)}>
                      {p} نقطة
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card className={activeTeam === 1 ? "ring-2 ring-ring" : ""}>
          <CardHeader className="pb-2">
            <CardTitle>الفريق الأول</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{scores.team1}</div>
          </CardContent>
        </Card>
        <Card className={activeTeam === 2 ? "ring-2 ring-ring" : ""}>
          <CardHeader className="pb-2">
            <CardTitle>الفريق الثاني</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{scores.team2}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default RiskGame;
