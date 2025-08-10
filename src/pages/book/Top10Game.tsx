import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";

const RANKS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const Top10Game = () => {
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ team1: 0, team2: 0 });

  const addPoints = (pts: number) => {
    setScores((s) => {
      const key = activeTeam === 1 ? "team1" : "team2";
      return { ...s, [key]: s[key] + pts } as typeof s;
    });
  };

  const resetAll = () => {
    setScores({ team1: 0, team2: 0 });
  };

  return (
    <main className="container max-w-3xl py-6">
      <SEO title="تحدي الكتاب | توب 10 (اللعب)" description="وضع اللعب لتوب 10 مع صندوق نقاط للفريقين." canonical="/book/top10/play" />

      <header className="mb-4 text-center space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold">توب 10</h1>
        <p className="text-muted-foreground">اختر الترتيب الصحيح وأضف النقاط</p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>النقاط</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">الدور الحالي</Badge>
              <div className="text-sm text-muted-foreground">الفريق {activeTeam === 1 ? "الأول" : "الثاني"}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {RANKS.map((r) => (
                <Button key={r} className="h-11" onClick={() => addPoints(r)}>
                  المركز {r} (+{r})
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" variant="secondary" onClick={() => setActiveTeam((t) => (t === 1 ? 2 : 1))}>
                تبديل الدور
              </Button>
              <Button className="flex-1" variant="outline" onClick={resetAll}>إعادة ضبط النقاط</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>لوحة اللعب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>اضغط على الترتيب الصحيح لإضافة النقاط طبقًا للمركز.</p>
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

export default Top10Game;
