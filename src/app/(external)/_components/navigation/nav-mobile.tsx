import { Button } from "@/components/ui/button";

export function NavMobile() {
  return (
    <div className="border-border space-y-3 border-t py-4 md:hidden">
      <a href="#pricing" className="block py-2 text-gray-400 hover:text-white">
        Pricing
      </a>
      <a href="#about" className="block py-2 text-gray-400 hover:text-white">
        About
      </a>
      <div className="space-y-2 pt-4">
        <Button variant="ghost" className="w-full text-white hover:bg-white/10">
          Login
        </Button>
        <Button className="bg-cta-primary w-full text-black">Register</Button>
      </div>
    </div>
  );
}
