import type { ReactNode } from "react";

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mt-12 scroll-mt-24 first:mt-0" id={title.replace(/\s+/g, "-").toLowerCase()}>
      <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

export function QuestionBlock({
  label,
  helper,
  required,
  children,
}: {
  label: string;
  helper?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="text-sm font-semibold text-foreground">
        {label} {required ? <span className="text-[var(--brand-turquoise)]">*</span> : null}
      </p>
      {helper ? <p className="mt-1 text-xs text-muted-foreground">{helper}</p> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function TextInput({
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-border"
    />
  );
}

export function TextArea({
  name,
  value,
  onChange,
  rows = 4,
  placeholder,
  required,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <textarea
      name={name}
      required={required}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-border bg-background/50 px-4 py-3 text-sm leading-relaxed text-foreground outline-none focus:border-border"
    />
  );
}

export function CheckboxGroup({
  name,
  options,
  values,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const checked = values.includes(o.value);
        return (
          <label
            key={o.value}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 hover:border-border"
          >
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
  );
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  required,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      {options.map((o) => (
        <label
          key={o.value}
          className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 hover:border-border"
        >
          <input
            type="radio"
            name={name}
            required={required && !value}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="mt-1"
          />
          <span className="text-sm text-foreground/90">{o.label}</span>
        </label>
      ))}
    </div>
  );
}
