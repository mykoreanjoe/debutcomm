"use client";

import { useFormState, useFormStatus } from "react-dom";
import { requestVerification } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { VerificationState } from "./types";

const initialState: VerificationState = {
  message: null,
  type: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "요청 제출 중..." : "인증 요청하기"}
    </Button>
  );
}

export function VerificationForm() {
  const [state, formAction] = useFormState(requestVerification, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="studentName">학생 이름</Label>
        <Input
          id="studentName"
          name="studentName"
          placeholder="예: 김데뷔"
          required
        />
      </div>
      
      {state?.type === "error" && (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>오류</AlertTitle>
            <AlertDescription>
                {state.message}
            </AlertDescription>
        </Alert>
      )}

      <SubmitButton />
    </form>
  );
} 