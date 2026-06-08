"use client";

import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import { ArrowRight, Clock, Mail, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import imageHero from "/public/theodore-removebg-preview.png";

const TAGS = [
  "Tous",
  "nextjs",
  "react",
  "typescript",
  "prisma",
  "postgresql",
  "auth",
  "ui",
  "mobile",
];

const ARTICLES = [
  {
    title: "Mettre en place Auth.js v5 avec LinkedIn et Prisma",
    date: "08 juin 2026",
    readTime: "8 min read",
    tags: ["auth", "nextjs", "prisma"],
    excerpt:
      "Notes de terrain sur l'authentification LinkedIn, les sessions et la moderation dans une application Next.js.",
  },
  {
    title: "Structurer une page admin simple sans perdre en ergonomie",
    date: "07 juin 2026",
    readTime: "6 min read",
    tags: ["ui", "react"],
    excerpt:
      "Sidebar, etats de chargement, confirmations et actions rapides pour garder une interface claire.",
  },
  {
    title: "Pourquoi j'utilise PostgreSQL pour mes projets web",
    date: "05 juin 2026",
    readTime: "5 min read",
    tags: ["postgresql", "prisma"],
    excerpt:
      "Un retour pratique sur les donnees relationnelles, Prisma et les bases cloud modernes.",
  },
  {
    title: "Construire des composants React reutilisables",
    date: "28 mai 2026",
    readTime: "7 min read",
    tags: ["react", "typescript", "ui"],
    excerpt:
      "Petites decisions de design system qui rendent un code plus agreable a maintenir.",
  },
  {
    title: "Du mobile au web: garder la meme rigueur produit",
    date: "19 mai 2026",
    readTime: "4 min read",
    tags: ["mobile"],
    excerpt:
      "Ce que le developpement mobile apprend sur les etats, la performance et la clarte des parcours.",
  },
  {
    title: "Preparer une application Next.js pour la production",
    date: "12 mai 2026",
    readTime: "9 min read",
    tags: ["nextjs", "typescript"],
    excerpt:
      "Build, metadata, images, routes dynamiques et quelques points a verifier avant de deployer.",
  },
];

const FEATURED_ARTICLE = ARTICLES[0];

export default function BlogPage() {
  useTrackPageView();

  const [activeTag, setActiveTag] = useState("Tous");
  const [query, setQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return ARTICLES.filter((article) => {
      const matchesTag =
        activeTag === "Tous" || article.tags.includes(activeTag);
      const matchesQuery =
        !normalizedQuery ||
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.excerpt.toLowerCase().includes(normalizedQuery) ||
        article.tags.some((tagName) => tagName.includes(normalizedQuery));

      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  return (
    <main className=" flex w-full  flex-col gap-12  text-slate-200 -mt-28">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
        <div className="max-w-2xl">
          <span className="mb-4 inline-flex h-8 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-semibold uppercase tracking-wide text-[#b2d2fa]">
            <Tag size={14} />
            Blog
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Notes, idees et retours d&apos;experience.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-400 md:text-lg">
            Une selection d&apos;articles autour de Next.js, React, TypeScript,
            Prisma, design d&apos;interface et construction de produits web
            utiles.
          </p>
        </div>

        <div className="relative hidden overflow-hidden rounded-md border border-white/10 bg-white/5 lg:block">
          <Image
            src={imageHero}
            alt="Theodore Samba"
            width={260}
            height={300}
            className="h-[300px] w-full object-contain object-bottom"
            priority
            placeholder="blur"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#222020] to-transparent p-4">
            <p className="text-sm font-semibold text-white">Theodore Samba</p>
            <p className="text-xs text-slate-400">Developpeur web & mobile</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <label
          htmlFor="blog-search"
          className="relative block max-w-xl text-slate-300"
        >
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            id="blog-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un article"
            className="h-11 w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#b2d2fa]"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {TAGS.map((tagName) => {
            const active = activeTag === tagName;

            return (
              <button
                key={tagName}
                type="button"
                onClick={() => setActiveTag(tagName)}
                className={`h-8 rounded-md border px-3 text-xs font-semibold transition ${
                  active
                    ? "border-[#b2d2fa] bg-[#b2d2fa] text-black"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-[#b2d2fa] hover:text-white"
                }`}
              >
                #{tagName}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-md border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5 shadow-xl md:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="font-bold uppercase tracking-wide text-[#b2d2fa]">
            Article en vedette
          </span>
          <span>{FEATURED_ARTICLE.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} />
            {FEATURED_ARTICLE.readTime}
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_180px] md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {FEATURED_ARTICLE.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              {FEATURED_ARTICLE.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {FEATURED_ARTICLE.tags.map((tagName) => (
                <span
                  key={tagName}
                  className="rounded-md border border-[#b2d2fa]/20 bg-[#b2d2fa]/10 px-2.5 py-1 text-xs font-semibold text-[#b2d2fa]"
                >
                  #{tagName}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#b2d2fa] px-4 text-sm font-bold text-black transition hover:bg-white"
          >
            En discuter
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Toutes les publications
          </h3>
          <span className="text-xs text-slate-500">
            {filteredArticles.length} article
            {filteredArticles.length > 1 ? "s" : ""}
          </span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid gap-3">
            {filteredArticles.map((article) => (
              <article
                key={article.title}
                className="group rounded-md border border-transparent p-4 transition hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {article.tags.map((tagName) => (
                        <span
                          key={tagName}
                          className="text-xs font-semibold text-[#b2d2fa]"
                        >
                          #{tagName}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-100 transition group-hover:text-white">
                      {article.title}
                    </h4>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500 md:pt-7">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-white/10 bg-white/5 p-6 text-sm text-slate-400">
            Aucun article ne correspond a cette recherche.
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-md border border-white/10 bg-white/[0.04] p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">
            Une idee d&apos;article ou de collaboration ?
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Parlons technique, produit ou interface autour d&apos;un projet
            concret.
          </p>
        </div>
        <Link
          href="mailto:theodorebinda@gmail.com"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/10 px-4 text-sm font-semibold text-white transition hover:border-[#b2d2fa] hover:text-[#b2d2fa]"
        >
          <Mail size={16} />
          Ecrire
        </Link>
      </section>
    </main>
  );
}
