import { APP_CONFIG } from "@/config";

export function Footer() {
  return (
    <footer className="mt-20 border-border bg-primary backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <p>{APP_CONFIG.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
