export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-6 text-center text-sm text-text-muted">
      <p>© {year} Riko Ardianto — Cyber Security. Build anything, break anything.</p>
    </footer>
  );
}
