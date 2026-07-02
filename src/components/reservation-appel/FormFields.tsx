import { useEffect, useMemo, useState } from "react";

export type FormValues = Record<string, string | string[]>;

export function useAutosaveForm(storageKey: string, initial: FormValues) {
  const [values, setValues] = useState<FormValues>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as FormValues;
      if (parsed && typeof parsed === "object") setValues((v) => ({ ...v, ...parsed }));
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(values));
    } catch {
      // ignore
    }
  }, [storageKey, values]);

  return { values, setValues };
}

export function setField(setValues: React.Dispatch<React.SetStateAction<FormValues>>, name: string, value: string | string[]) {
  setValues((prev) => ({ ...prev, [name]: value }));
}

export function useFormCompletion(values: FormValues, requiredNames: string[]) {
  return useMemo(() => {
    const isFilled = (name: string) => {
      const v = values[name];
      if (Array.isArray(v)) return v.length > 0;
      return typeof v === "string" && v.trim().length > 0;
    };
    const filled = requiredNames.filter(isFilled).length;
    return { filled, total: requiredNames.length };
  }, [requiredNames, values]);
}

export function TextInput({
  label,
  helper,
  name,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">
          {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
        </span>
      </div>
      {helper ? <div className="mt-1 text-xs text-muted-foreground">{helper}</div> : null}
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
        placeholder={placeholder}
      />
    </label>
  );
}

export function TextArea({
  label,
  helper,
  name,
  required,
  placeholder,
  rows = 5,
  maxLength,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">
          {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
        </span>
        {maxLength ? (
          <span className="text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
      {helper ? <div className="mt-1 text-xs text-muted-foreground">{helper}</div> : null}
      <textarea
        name={name}
        required={required}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none ring-0 focus:border-white/20"
        placeholder={placeholder}
      />
    </label>
  );
}

export function ChoiceSingle({
  label,
  helper,
  name,
  required,
  options,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur">
      <legend className="px-2 text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
      </legend>
      {helper ? <div className="mt-2 px-2 text-xs text-muted-foreground">{helper}</div> : null}
      <div className="mt-4 grid gap-2">
        {options.map((o) => (
          <label key={o.value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-background/40 px-4 py-3 hover:border-white/10">
            <input
              type="radio"
              name={name}
              required={required}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-1"
            />
            <span className="text-sm text-foreground/90">{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ChoiceMulti({
  label,
  helper,
  name,
  required,
  options,
  values,
  onChange,
}: {
  label: string;
  helper?: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const hasValue = values.length > 0;

  return (
    <fieldset className="rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur">
      <legend className="px-2 text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
      </legend>
      {helper ? <div className="mt-2 px-2 text-xs text-muted-foreground">{helper}</div> : null}
      {required && !hasValue ? <div className="mt-2 px-2 text-xs text-[var(--brand-yellow)]">Choisis au moins une option.</div> : null}
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {options.map((o) => {
          const checked = values.includes(o.value);
          return (
            <label key={o.value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-background/40 px-4 py-3 hover:border-white/10">
              <input
                type="checkbox"
                name={name}
                value={o.value}
                checked={checked}
                onChange={(e) => {
                  if (e.target.checked) onChange([...values, o.value]);
                  else onChange(values.filter((x) => x !== o.value));
                }}
                className="mt-1"
              />
              <span className="text-sm text-foreground/90">{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ChoiceScale({
  label,
  name,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/5 bg-card/40 p-5 shadow-card backdrop-blur">
      <legend className="px-2 text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-[var(--brand-turquoise)]">⭐</span> : null}
      </legend>
      <div className="mt-4 grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, i) => String(i)).map((n) => (
          <label
            key={n}
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border px-1 py-2 text-xs font-semibold ${
              value === n ? "border-[var(--brand-turquoise)] bg-[var(--brand-turquoise)]/10 text-foreground" : "border-white/5 bg-background/40 text-foreground/70 hover:border-white/10"
            }`}
          >
            <input
              type="radio"
              name={name}
              required={required}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            {n}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mt-14">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
