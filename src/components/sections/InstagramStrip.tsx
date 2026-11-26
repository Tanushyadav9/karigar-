"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ATELIER_CONTACT, INSTAGRAM_TILES } from "@/data/karigarData";

export function InstagramStrip() {
  return (
    <section
      id="instagram"
      className="relative z-20 border-t border-gold/20 bg-charcoal-elevated px-gutter py-section-sm text-ivory"
    >
      <div className="mx-auto max-w-atelier">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
              ०७ · Atelier Journal
            </p>
            <h2 className="mt-2 font-display text-3xl font-light text-ivory sm:text-5xl">
              Follow the Thread{" "}
              <a
                href={ATELIER_CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="stitch-link italic text-gold-foil"
              >
                {ATELIER_CONTACT.instagramHandle}
              </a>
            </h2>
          </div>

          <a
            href={ATELIER_CONTACT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-gold/55 px-5 py-2.5 font-sans text-[10px] uppercase tracking-atelier text-gold transition-colors hover:bg-gold hover:text-charcoal"
          >
            Open Instagram →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {INSTAGRAM_TILES.map((tile, idx) => (
            <motion.a
              key={tile.id}
              href={ATELIER_CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="view"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative aspect-[3/4] overflow-hidden border border-gold/25 bg-charcoal"
            >
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 16vw"
                className="object-cover object-top transition-transform duration-900 ease-atelier group-hover:scale-108"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95"
              />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="truncate font-sans text-[9px] uppercase tracking-atelier text-gold-light">
                  {tile.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
