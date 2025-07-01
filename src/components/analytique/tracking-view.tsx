// components/TrackPageView.tsx
"use client";

import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import { Suspense } from "react";

function TrackPageViewInner() {
  useTrackPageView();
  return null;
}

export default function TrackPageView() {
  return (
    <Suspense fallback={null}>
      <TrackPageViewInner />
    </Suspense>
  );
}
