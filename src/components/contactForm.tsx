"use client";

import React, { useRef, useState, FormEvent } from "react";
import emailjs, { init } from "@emailjs/browser";
import { Container } from "@/ui/components/container/container";
import { useTranslation } from "@/lib/hooks/useTranslation";

init("VCyUVQhmgVW3VDFiv");

export const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formErrors = {};

    if (!name) {
      formErrors = {
        ...formErrors,
        name: t("contact.form.errors.name_required"),
      };
    }

    if (!email) {
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

    if (!message) {
      formErrors = {
        ...formErrors,
        message: t("contact.form.errors.message_required"),
      };
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        if (form.current) {
          const result = await emailjs.sendForm(
            "service_4p5in7e",
            "template_8dz8bpg",
            form.current
          );
          console.log("Message sent successfully");
          console.log("SUCCESS!", result.text);
          setName("");
          setEmail("");
          setMessage("");
          setErrors({});
          setShowSuccessPopup(true);
          setTimeout(() => setShowSuccessPopup(false), 3000);
          form.current?.reset();
        }
      } catch (error) {
        console.error("Email sending failed:", error);
      }
    }
  };

  return (
    <Container className="flex w-full justify-between">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full flex flex-col gap-10"
      >
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
        <input
          type="submit"
          value={t("contact.form.submit")}
          className="bg-[#b2d2fa] text-black hover:bg-[#5182be] hover:font-semibold p-2 rounded cursor-pointer"
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
