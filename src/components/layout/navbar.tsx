"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";
import { Icons } from "../ui/icons";
import { Package2 } from "lucide-react";
import { type Session } from "next-auth";

export function MainNav({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        {/* <span className="hidden font-bold sm:inline-block">Chat With Jung</span> */}
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/"
          className={cn(
            "hover:text-foreground/80 transition-colors",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {session && (
          <div className="gap-4">
            <Link
              href={`/user/${session.user.id}`}
              className={cn(
                "hover:text-foreground/80 transition-colors",
                pathname === "/user" ? "text-foreground" : "text-foreground/60",
              )}
            >
              Tarea
            </Link>
          </div>
        )}
        {session && (
          <div className="gap-4">
            <Link
              href={`/client/${session.user.id}`}
              className={cn(
                "hover:text-foreground/80 transition-colors",
                pathname === "/client"
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              Clientes
            </Link>
          </div>
        )}
        {!session ? (
          <Link
            href={`/dashboard`}
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname === "/dashboard"
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Resultados
          </Link>
        ) : (
          <Link
            href={`/dashboard/${session.user.id}`}
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname === "/dashboard"
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Analisis
          </Link>
        )}
        {session && (
          <Link
            href={`/send/${session.user.id}`}
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname === "/send" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Enviar
          </Link>
        )}

        <Link
          href="/contact"
          className={cn(
            "hover:text-foreground/80 transition-colors",
            pathname === "/contact" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Contacto
        </Link>

        {/* <Link
          href="/themes"
          className={cn(
            "hover:text-foreground/80 transition-colors",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Themes
        </Link>
        <Link
          href="/examples"
          className={cn(
            "hover:text-foreground/80 transition-colors",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Examples
        </Link>
        <Link
          href="/blocks"
          className={cn(
            "hover:text-foreground/80 transition-colors",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Blocks
        </Link> */}
        {/* <Link
          href={siteConfig.links.github}
          className={cn(
            "text-foreground/60 hover:text-foreground/80 hidden transition-colors lg:block",
          )}
        >
          GitHub
        </Link> */}
      </nav>
    </div>
  );
}
