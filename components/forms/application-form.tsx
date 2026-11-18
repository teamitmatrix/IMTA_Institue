"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, LoaderCircle, Send } from "lucide-react";
import type { CourseSlug } from "@/types/content";
import { courses } from "@/data/courses";
import { countries, DEFAULT_COUNTRY } from "@/data/countries";
import { applyIntro } from "@/data/home";
import { applicationSchema, learnerStatuses, type ApplicationData, type ApplicationInput } from "@/lib/validations/application";
import { submitApplication } from "@/lib/actions/submit-application";
import { Button } from "@/components/ui/button";
import { Field, controlClasses } from "@/components/forms/field";
import { ChoiceGroup, Honeypot, ServerError, SuccessPanel, useFormStartedAt } from "@/components/forms/form-parts";

const fieldNames = ["fullName", "email", "currentRole", "learnerStatus", "country", "course", "message"] as const;
type FieldName = (typeof fieldNames)[number];
const MESSAGE_MAX = 1000;

/**
 * Application form (BRD §K). React Hook Form + the shared Zod schema on the
 * client; the Server Action re-validates everything.
 */
export function ApplicationForm({ defaultCourse = "ai-for-professionals" }: { defaultCourse?: CourseSlug }) {
  const [isPending, startTransition] = useTransition();
  // Unique per instance: Cache Components keeps hidden routes in the DOM, so
  // fixed ids would collide when two pages with this form are both mounted.
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const emptyValues = (): ApplicationInput => ({
    fullName: "",
    email: "",
    currentRole: "",
    course: defaultCourse,
    country: DEFAULT_COUNTRY,
    learnerStatus: undefined as unknown as ApplicationInput["learnerStatus"],
    message: "",
    website: "",
    startedAt: 0,
  });

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<ApplicationInput, unknown, ApplicationData>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    defaultValues: emptyValues(),
  });

  useFormStartedAt(setValue);

  // Preselect a course from ?course=<slug>. Read on mount so the form stays in the static HTML.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("course");
    const match = courses.find((c) => c.slug === slug);
    if (match) setValue("course", match.slug);
  }, [setValue]);

  const messageLength = (useWatch({ control, name: "message" }) ?? "").length;
  const learnerStatus = useWatch({ control, name: "learnerStatus" });

  const onSubmit = (values: ApplicationData) => {
    setServerError(null);
    startTransition(async () => {
      const result = await submitApplication(values);
      if (result.ok) {
        setSubmitted(true);
        return;
      }
      setServerError(result.message);
      for (const name of fieldNames) {
        const message = result.fieldErrors?.[name]?.[0];
        if (message) setError(name, { type: "server", message });
      }
    });
  };

  if (submitted) {
    return (
      <SuccessPanel
        title="Application received"
        actionLabel="Submit another application"
        onAction={() => {
          reset({ ...emptyValues(), startedAt: Date.now() });
          setSubmitted(false);
        }}
      >
        <p>Thank you. Our team will contact you within one business day.</p>
      </SuccessPanel>
    );
  }

  const a11y = (name: FieldName) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${fid(name)}-error` : undefined,
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      aria-describedby={serverError ? fid("server-error") : undefined}
    >
      {serverError ? <ServerError id={fid("server-error")} message={serverError} /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fid("fullName")} label="Full name" error={errors.fullName?.message}>
          <input id={fid("fullName")} type="text" autoComplete="name" className={controlClasses} {...a11y("fullName")} {...register("fullName")} />
        </Field>

        <Field id={fid("email")} label="Email" error={errors.email?.message}>
          <input
            id={fid("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            className={controlClasses}
            {...a11y("email")}
            {...register("email")}
          />
        </Field>
      </div>

      <Field id={fid("currentRole")} label="Current role" error={errors.currentRole?.message}>
        <input
          id={fid("currentRole")}
          type="text"
          autoComplete="organization-title"
          placeholder="e.g. Marketing manager, nursing student, analyst"
          className={controlClasses}
          {...a11y("currentRole")}
          {...register("currentRole")}
        />
      </Field>

      <ChoiceGroup
        legend="Are you a student or a professional?"
        type="radio"
        options={learnerStatuses}
        register={register("learnerStatus")}
        selected={learnerStatus ? [learnerStatus] : []}
        error={errors.learnerStatus?.message}
        errorId={fid("learnerStatus-error")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fid("country")} label="Country" error={errors.country?.message}>
          <div className="relative">
            <select
              id={fid("country")}
              autoComplete="country"
              className={`${controlClasses} appearance-none pr-11`}
              {...a11y("country")}
              {...register("country")}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
          </div>
        </Field>

        <Field id={fid("course")} label="I'm interested in" error={errors.course?.message}>
          <div className="relative">
            <select id={fid("course")} className={`${controlClasses} appearance-none pr-11`} {...a11y("course")} {...register("course")}>
              {courses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.name}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
          </div>
        </Field>
      </div>

      <Field id={fid("message")} label="Message (optional)" error={errors.message?.message}>
        <textarea
          id={fid("message")}
          rows={3}
          maxLength={MESSAGE_MAX}
          placeholder="Anything you'd like us to know — goals, questions or scheduling needs"
          className={`${controlClasses} h-auto min-h-24 resize-y py-3`}
          {...a11y("message")}
          {...register("message")}
        />
        <p className="text-right text-xs text-ink-subtle" aria-live="polite">
          {messageLength > MESSAGE_MAX * 0.8 ? `${messageLength}/${MESSAGE_MAX}` : ""}
        </p>
      </Field>

      <Honeypot id={fid("website")} register={register("website")} />

      <Button type="submit" size="lg" fullWidth disabled={isPending} aria-busy={isPending || undefined}>
        {isPending ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            {applyIntro.submitLabel}
            <Send aria-hidden className="size-4" />
          </>
        )}
      </Button>
      <p className="text-center text-xs text-ink-subtle">
        We&apos;ll only use your details to contact you about your application.
      </p>
    </form>
  );
}
