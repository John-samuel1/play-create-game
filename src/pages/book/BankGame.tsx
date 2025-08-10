import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const QUESTIONS: { q: string; a: string }[] = [
  { q: "كم مرة فازت الأوروغواي بكأس العالم؟", a: "2" },
  { q: "عدد أسفار العهد الجديد؟", a: "27" },
  { q: "أول من عبر البحر الأحمر؟", a: "موسى" },
  { q: "عدد أسفار المزامير؟", a: "150" },
  { q: "ما هي عاصمة مصر؟", a: "القاهرة" },
  { q: "أول إنجيل؟", a: "متى" },
  { q: "عدد شهور السنة؟", a: "12" },
  { q: "أطول أنهار العالم؟", a: "النيل" },
  { q: "كم عدد أيام الأسبوع؟", a: "7" },
  { q: "عدد أسباط بني إسرائيل؟", a: "12" },
  { q: "يدعى أب الآباء؟", a: "إبراهيم" },
  { q: "مدينة السلام؟", a: "أورشليم" },
];

const toMMSS = (s: number) => {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(1, "0");
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
};

const BankGame = () => {
  const [current, setCurrent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2:00
  const intervalRef = useRef<number | null>(null);

  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [pot, setPot] = useState(0); // غير مخزن
  const [power, setPower] = useState(1); // 1 ثم 2 ثم 4...
  const [round, setRound] = useState<number>(1);

  const question = useMemo(() => QUESTIONS[current], [current]);

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
          toast("انتهى الوقت!", { description: "احسبوا النقاط المخزنة" });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleCorrect = () => {
    setPot((p) => p + power);
    setPower((pw) => pw * 2);
    nextQuestion();
  };

  const handleWrong = () => {
    setPot(0);
    setPower(1);
    nextQuestion();
  };

  const bankNow = () => {
    setScores((s) => {
      const key = activeTeam === 1 ? "team1" : "team2";
      const updated = { ...s, [key]: s[key] + pot } as typeof s;
      return updated;
    });
    setPot(0);
    setPower(1);
  };

  const nextQuestion = () => {
    setCurrent((c) => {
      const next = c + 1;
      if (next >= QUESTIONS.length) {
        toast("انتهت الجولة!", { description: "يمكنكم إعادة الضبط للبدء من جديد" });
        setIsRunning(false);
        return c; // لا تتخطى الحد
      }
      return next;
    });
  };

  const resetAll = () => {
    setCurrent(0);
    setIsRunning(false);
    setTimeLeft(120);
    setScores({ team1: 0, team2: 0 });
    setPot(0);
    setPower(1);
  };

  return (
    <main className="container max-w-3xl py-6">
      <SEO title="تحدي الكتاب | بنك (اللعب)" description="وضع اللعب لبنك مع مؤقت ونقاط للفريقين." canonical="/book/bank/play" />

      <header className="mb-4 text-center space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold">بنك</h1>
        <p className="text-muted-foreground">الجولة {round}</p>
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
              <Button className="flex-1" variant="outline" onClick={() => setTimeLeft(120)}>إعادة</Button>
            </div>
            <Button variant="ghost" className="w-full" onClick={resetAll}>إعادة ضبط الجولة</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between gap-2">
              <span>السؤال {Math.min(current + 1, QUESTIONS.length)} / {QUESTIONS.length}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">الجولة {round}</Badge>
                <Select value={String(round)} onValueChange={(v) => setRound(Number(v))}>
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="الجولة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">الجولة 1</SelectItem>
                    <SelectItem value="2">الجولة 2</SelectItem>
                    <SelectItem value="3">الجولة 3</SelectItem>
                    <SelectItem value="4">الجولة 4</SelectItem>
                    <SelectItem value="5">الجولة 5</SelectItem>
                    <SelectItem value="6">الجولة 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 bg-card/50">
              <p className="text-lg">{question?.q}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleCorrect}>إجابة صحيحة</Button>
              <Button variant="secondary" onClick={handleWrong}>إجابة غلط</Button>
              <Button variant="outline" onClick={bankNow}>بنك (رصيد غير مخزن: {pot})</Button>
              <Button variant="ghost" onClick={() => setActiveTeam((t) => (t === 1 ? 2 : 1))}>
                تبديل الدور: الفريق {activeTeam === 1 ? "الأول" : "الثاني"}
              </Button>
            </div>
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

export default BankGame;
