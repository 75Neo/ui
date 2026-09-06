import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@75neo/react/button";
import { Swap } from "@75neo/react/swap";

export function SwapPreview() {
  const [dark, setDark] = useState(false);

  return (
    <Button variant="outline" color="neutral" square onClick={() => setDark(!dark)}>
      <Swap swapped={dark} onIcon={<Moon />} offIcon={<Sun />} />
    </Button>
  );
}
