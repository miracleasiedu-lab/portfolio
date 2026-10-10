import { Download } from "lucide-react";
import { cvHref, isCvAvailable } from "@/lib/cv";
import { site } from "@/data/site";
import { ButtonLink, DisabledAction } from "./ui";

export function CvButton({ variant = "secondary" }: { variant?: "primary" | "secondary" }) {
  if (isCvAvailable()) {
    return (
      <ButtonLink href={cvHref} variant={variant} download={site.cvFileName}>
        <Download className="h-4 w-4" aria-hidden="true" />
        Download CV
        <span className="sr-only">(PDF)</span>
      </ButtonLink>
    );
  }
  return (
    <DisabledAction reason="The CV PDF has not been added yet. Place it at public/cv/ to enable this button.">
      <Download className="h-4 w-4" aria-hidden="true" />
      CV PDF coming soon
    </DisabledAction>
  );
}
