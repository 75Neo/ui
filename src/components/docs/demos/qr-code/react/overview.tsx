import { Download } from "lucide-react";
import { QrCode, QrCodeDownloadTrigger, QrCodeFrame, QrCodePattern } from "@/components/react";

export default function QrCodeOverview() {
  return (
    <div className="flex justify-center">
      <QrCode defaultValue="https://75neo-ui.pages.dev">
        <QrCodeFrame>
          <QrCodePattern />
        </QrCodeFrame>
        <QrCodeDownloadTrigger fileName="75neo-ui.png" mimeType="image/png">
          <Download />
          Download
        </QrCodeDownloadTrigger>
      </QrCode>
    </div>
  );
}
