import { test } from "node:test";
import assert from "node:assert/strict";
import { applicationSchema } from "@/lib/validations/application";
import { corporateInquirySchema } from "@/lib/validations/corporate-inquiry";

const validApplication = {
  fullName: "Jordan Lee",
  email: "  Jordan.Lee@Example.COM ",
  currentRole: "Analyst",
  course: "prompt-engineering",
  country: "US",
  learnerStatus: "professional",
  message: "",
  website: "",
  startedAt: 1_700_000_000_000,
};

test("valid application parses and normalizes email + empty message", () => {
  const result = applicationSchema.safeParse(validApplication);
  assert.equal(result.success, true);
  assert.equal(result.data?.email, "jordan.lee@example.com");
  assert.equal(result.data?.message, undefined);
});

test("application rejects bad email formats", () => {
  for (const email of ["", "not-an-email", "a@b", "a b@c.com", "@example.com"]) {
    const result = applicationSchema.safeParse({ ...validApplication, email });
    assert.equal(result.success, false, `expected "${email}" to be rejected`);
  }
});

test("application requires every required field", () => {
  for (const field of ["fullName", "email", "currentRole", "course", "country", "learnerStatus", "startedAt"]) {
    const input: Record<string, unknown> = { ...validApplication };
    delete input[field];
    assert.equal(applicationSchema.safeParse(input).success, false, `missing ${field} should fail`);
  }
});

test("application rejects unknown course, country and status values", () => {
  assert.equal(applicationSchema.safeParse({ ...validApplication, course: "free-money" }).success, false);
  assert.equal(applicationSchema.safeParse({ ...validApplication, country: "XX" }).success, false);
  assert.equal(applicationSchema.safeParse({ ...validApplication, learnerStatus: "admin" }).success, false);
});

test("application enforces length limits and link-stuffing", () => {
  assert.equal(applicationSchema.safeParse({ ...validApplication, fullName: "A" }).success, false);
  assert.equal(applicationSchema.safeParse({ ...validApplication, message: "x".repeat(1001) }).success, false);
  const spammy = "see https://a.com https://b.com https://c.com";
  assert.equal(applicationSchema.safeParse({ ...validApplication, message: spammy }).success, false);
  assert.equal(applicationSchema.safeParse({ ...validApplication, message: "my portfolio: https://me.dev" }).success, true);
});

test("application honeypot must be empty", () => {
  assert.equal(applicationSchema.safeParse({ ...validApplication, website: "http://spam" }).success, false);
});

const validInquiry = {
  companyName: "Acme Corp",
  contactName: "Sam Rivera",
  workEmail: "SAM@acme.com",
  jobTitle: "",
  country: "US",
  companySize: "51-200",
  trainingInterests: ["team_upskilling"],
  deliveryPreference: "online",
  message: "",
  website: "",
  startedAt: 1_700_000_000_000,
};

test("valid corporate inquiry parses", () => {
  const result = corporateInquirySchema.safeParse(validInquiry);
  assert.equal(result.success, true);
  assert.equal(result.data?.workEmail, "sam@acme.com");
  assert.equal(result.data?.jobTitle, undefined);
});

test("corporate inquiry requires interests and valid enums", () => {
  assert.equal(corporateInquirySchema.safeParse({ ...validInquiry, trainingInterests: [] }).success, false);
  assert.equal(corporateInquirySchema.safeParse({ ...validInquiry, trainingInterests: ["pizza"] }).success, false);
  assert.equal(corporateInquirySchema.safeParse({ ...validInquiry, companySize: "huge" }).success, false);
  assert.equal(corporateInquirySchema.safeParse({ ...validInquiry, deliveryPreference: "mars" }).success, false);
});
