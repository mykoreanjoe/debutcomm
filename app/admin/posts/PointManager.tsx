"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updatePostPoints } from "./actions";

interface PointManagerProps {
  postId: number;
  currentPoints: number;
}

export default function PointManager({
  postId,
  currentPoints,
}: PointManagerProps) {
  const [points, setPoints] = useState(currentPoints);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await updatePostPoints(postId, points);
    if (result.error) {
      alert(result.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="number"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        className="w-24"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
} 