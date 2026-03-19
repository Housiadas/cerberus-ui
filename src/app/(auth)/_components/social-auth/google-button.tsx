import { siGoogle } from "simple-icons";

import { SimpleIconEle } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GoogleButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="secondary" className={cn(className)} {...props}>
      <SimpleIconEle icon={siGoogle} className="size-4" />
      Continue with Google
    </Button>
  );
}
