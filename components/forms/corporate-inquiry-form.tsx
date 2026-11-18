"use client";

import { useId, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, LoaderCircle, Send } from "lucide-react";
import { countries, DEFAULT_COUNTRY } from "@/data/countries";
import {
  companySizes,
  corporateInquirySchema,
  deliveryPreferences,
  trainingInterests,
  type CorporateInquiryData,
  type CorporateInquiryInput,
} from "@/lib/validations/corporate-inquiry";
import { submitCorporateInquiry } from "@/lib/actions/submit-corporate-inquiry";
import { Button } from "@/components/ui/button";
import { Field, controlClasses } from "@/components/forms/field";
import { ChoiceGroup, Honeypot, ServerError, SuccessPanel, useFormStartedAt } from "@/components/forms/form-parts";

const fieldNames = [
  "companyName",
  "contactName",
  "workEmail",
  "jobTitle",
  "country",
  "companySize",
  "trainingInterests",
  "deliveryPreference",
  "message",
] as const;
type FieldName = (typeof fieldNames)[number];

const emptyValues = (): CorporateInquiryInput => ({
  companyName: "",
  contactName: "",
  workEmail: "",
  jobTitle: "",
  country: DEFAULT_COUNTRY,
  companySize: "" as unknown as CorporateInquiryInput["companySize"],
  trainingInterests: [],
  deliveryPreference: undefined as unknown as CorporateInquiryInput["deliveryPreference"],
  message: "",
  website: "",
  startedAt: 0,
});

/** Company training request form (BRD §I) — separate flow from course applications. */
export function CorporateInquiryForm() {
  const [isPending, startTransition] = useTransition();
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<CorporateInquiryInput, unknown, CorporateInquiryData>({
    resolver: zodResolver(corporateInquirySchema),
    mode: "onTouched",
    defaultValues: emptyValues(),
  });

  useFormStartedAt(setValue);

  const interests = useWatch({ control, name: "trainingInterests" }) ?? [];
  const delivery = useWatch({ control, name: "deliveryPreference" });

  const onSubmit = (values: CorporateInquiryData) => {
    setServerError(null);
    startTransition(async () => {
      const result = await submitCorporateInquiry(values);
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
        title="Request received"
        actionLabel="Send another request"
        onAction={() => {
          reset({ ...emptyValues(), startedAt: Date.now() });
          setSubmitted(false);
        }}
      >
        <p>Thank you. Our team will contact you within one business day to discuss your team&apos;s training.</p>
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
        <Field id={fid("companyName")} label="Company name" error={errors.companyName?.message}>
          <input id={fid("companyName")} type="text" autoComplete="organization" className={controlClasses} {...a11y("companyName")} {...register("companyName")} />
        </Field>
        <Field id={fid("companySize")} label="Company size" error={errors.companySize?.message}>
          <div className="relative">
            <select
              id={fid("companySize")}
              className={`${controlClasses} appearance-none pr-11`}
              {...a11y("companySize")}
              {...register("companySize")}
            >
              <option value="" disabled>
                Select…
              </option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size} employees
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
          </div>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fid("contactName")} label="Your name" error={errors.contactName?.message}>
          <input id={fid("contactName")} type="text" autoComplete="name" className={controlClasses} {...a11y("contactName")} {...register("contactName")} />
        </Field>
        <Field id={fid("jobTitle")} label="Job title (optional)" error={errors.jobTitle?.message}>
          <input id={fid("jobTitle")} type="text" autoComplete="organization-title" className={controlClasses} {...a11y("jobTitle")} {...register("jobTitle")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fid("workEmail")} label="Work email" error={errors.workEmail?.message}>
          <input
            id={fid("workEmail")}
            type="email"
            inputMode="email"
            autoComplete="email"
            className={controlClasses}
            {...a11y("workEmail")}
            {...register("workEmail")}
          />
        </Field>
        <Field id={fid("country")} label="Country" error={errors.country?.message}>
          <div className="relative">
            <select id={fid("country")} autoComplete="country" className={`${controlClasses} appearance-none pr-11`} {...a11y("country")} {...register("country")}>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
          </div>
        </Field>
      </div>

      <ChoiceGroup
        legend="What are you interested in?"
        hint="Choose all that apply."
        type="checkbox"
        options={trainingInterests}
        register={register("trainingInterests")}
        selected={interests}
        error={errors.trainingInterests?.message}
        errorId={fid("trainingInterests-error")}
      />

      <ChoiceGroup
        legend="Preferred delivery"
        type="radio"
        options={deliveryPreferences}
        register={register("deliveryPreference")}
        selected={delivery ? [delivery] : []}
        error={errors.deliveryPreference?.message}
        errorId={fid("deliveryPreference-error")}
      />

      <Field id={fid("message")} label="Tell us about your team (optional)" error={errors.message?.message}>
        <textarea
          id={fid("message")}
          rows={4}
          maxLength={2000}
          placeholder="Team size, departments, tools you use, goals or timing"
          className={`${controlClasses} h-auto min-h-28 resize-y py-3`}
          {...a11y("message")}
          {...register("message")}
        />
      </Field>

      <Honeypot id={fid("website")} register={register("website")} />

      <Button type="submit" size="lg" fullWidth disabled={isPending} aria-busy={isPending || undefined}>
        {isPending ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send training request
            <Send aria-hidden className="size-4" />
          </>
        )}
      </Button>
      <p className="text-center text-xs text-ink-subtle">We&apos;ll only use your details to respond to this request.</p>
    </form>
  );
}
