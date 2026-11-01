import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crax Chips Corn Toon | Toujours plus de plaisir !",
  description:
    "Découvrez l'univers 3D interactif de Crax Chips Corn Toon : saveurs Vanille, Fromage et Épicé. Le snack soufflé au maïs croustillant fabriqué avec passion en Côte d'Ivoire.",
  keywords: [
    "Crax Chips",
    "Corn Toon",
    "Snack Côte d'Ivoire",
    "Chips Abidjan",
    "EMCI",
    "Maïs soufflé",
    "Snack vanille fromage épicé",
  ],
  icons: {
    icon: "/assets/crax_logo.png",
  },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('crax-theme');
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#070e1c] text-[#0f2744] dark:text-slate-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
