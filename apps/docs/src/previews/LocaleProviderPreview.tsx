import { LocaleProvider } from "@75neo/react/locale-provider";

export function LocaleProviderPreview() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <LocaleProvider locale="en-US" className="rounded-lg bg-muted p-4 text-toned">
        <p>Reading left to right, with the gutter on the start edge.</p>
      </LocaleProvider>
      <LocaleProvider locale="ar-EG" className="rounded-lg bg-muted p-4 text-toned">
        <p>يقرأ من اليمين إلى اليسار.</p>
      </LocaleProvider>
    </div>
  );
}
