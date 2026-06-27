type LoadScriptOptions = {
  id: string;
  src: string;
};

export function loadExternalScript({ id, src }: LoadScriptOptions) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

