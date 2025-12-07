import { APP_CONFIG } from "@/config/app-config";

export function Footer() {
  return (
    <footer className="border-border bg-primary mt-20 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <p>{APP_CONFIG.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
