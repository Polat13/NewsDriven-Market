import { useEffect, useMemo, useState } from "react";
import { makeFakeImpact } from "../lib/fakeAnalysisData";

/**
 * useAnalysisImpact
 * - chart şimdilik fake - id değişince yeniden üret
 * - Backend impact verirse fake yerine gerçek map (fake otomatik kapanır)
 */
export function useAnalysisImpact({ id, data }) {
  // chart şimdilik fake - id değişince yeniden üret
  const [impact, setImpact] = useState(() => makeFakeImpact(id));
  const [useFakeImpact, setUseFakeImpact] = useState(true);

  // Birkaç olası backend formatını destekleyelim:
  const imp = useMemo(() => {
    return (
      data?.analysis?.impact ||
      data?.impact ||
      data?.analysisImpact ||
      null
    );
  }, [data]);

  // id değişince fake impact yeniden üret
  // (Ama backend impact geldiyse fake kapalı kalacak)
  useEffect(() => {
    // Yeni bir id'ye gidince önce fake'e dön (backend impact gelirse aşağıdaki effect kapatacak)
    setUseFakeImpact(true);
    setImpact(makeFakeImpact(id));
  }, [id]);

  // Backend impact verirse fake yerine gerçek map (fake otomatik kapanır)
  useEffect(() => {
    // Backend impact verirse fake yerine gerçek map:
    // const imp = data.analysis?.impact; // {d1,d2,d3}
    // if (imp) setImpact({ labels:["D+1","D+2","D+3"], values:[imp.d1, imp.d2, imp.d3] });

    // Beklenen format: { d1, d2, d3 } (string/number olabilir)
    const hasD1D2D3 =
      imp &&
      imp.d1 != null &&
      imp.d2 != null &&
      imp.d3 != null;

    if (hasD1D2D3) {
      setUseFakeImpact(false);
      setImpact({
        labels: ["D+1", "D+2", "D+3"],
        values: [Number(imp.d1), Number(imp.d2), Number(imp.d3)],
      });
    }
  }, [imp]);

  return { impact, useFakeImpact };
}
