"use client";

import React, { useState, FormEvent } from "react";
import { Container } from "@/ui/components/container/container";
import { useTranslation } from "@/lib/hooks/useTranslation";

type ContactApiResponse = {
  ok: boolean;
  code?: string;
  message?: string;
  errors?: Record<string, string[]>;
};

export const ContactForm = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    if (!name.trim()) {
      formErrors = {
        ...formErrors,
        name: t("contact.form.errors.name_required"),
      };
    }

    if (!email.trim()) {
      formErrors = {
        ...formErrors,
        email: t("contact.form.errors.email_required"),
      };
    } else if (!validateEmail(email)) {
      formErrors = {
        ...formErrors,
        email: t("contact.form.errors.email_invalid"),
      };
    }

    if (!message.trim()) {
      formErrors = {
        ...formErrors,
        message: t("contact.form.errors.message_required"),
      };
    }

    setErrors(formErrors);
    setSubmitError("");

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
        }),
      });

      const data = (await response
        .json()
        .catch(() => null)) as ContactApiResponse | null;

      if (!response.ok || !data?.ok) {
        setSubmitError(
          data?.message ?? t("contact.form.errors.send_failed")
        );
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setErrors({});
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch {
      setSubmitError(t("contact.form.errors.network"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="flex w-full justify-between">
      <form
        onSubmit={sendEmail}
        className="w-full flex flex-col gap-10"
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <Container className="flex flex-col lg:flex-row gap-10 lg:justify-between lg:items-center">
          <Container className="flex flex-col gap-2">
            <label className="font-semibold">{t("contact.form.name")}</label>
            <input
              type="text"
              name="name"
              placeholder={t("contact.form.name_placeholder")}
              className="placeholder-slate-400 bg-transparent focus:outline-none focus:border-b-2 pb-5 border-b"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </Container>
          <Container className="flex flex-col gap-2">
            <label className="font-semibold">{t("contact.form.email")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("contact.form.email_placeholder")}
              className="placeholder-slate-400 bg-transparent focus:outline-none focus:border-b-2 pb-5 border-b"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </Container>
        </Container>
        <Container className="flex flex-col gap-2">
          <label className="font-semibold">
            {t("contact.form.message")} {/* Traduction */}
          </label>
          <textarea
            name="message"
            placeholder={t("contact.form.message_placeholder")}
            className="placeholder-slate-400 bg-transparent focus:outline-none focus:border-b-2 pb-5 border-b resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && (
            <span className="text-red-500">{errors.message}</span>
          )}
        </Container>
        {submitError && (
          <span role="alert" className="text-red-500">
            {submitError}
          </span>
        )}
        <input
          type="submit"
          value={
            isSubmitting
              ? t("contact.form.sending")
              : t("contact.form.submit")
          }
          disabled={isSubmitting}
          className="bg-[#b2d2fa] text-black hover:bg-[#5182be] hover:font-semibold p-2 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        />
      </form>
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>{t("contact.form.success")}</p>
          </div>
        </div>
      )}
    </Container>
  );
};
