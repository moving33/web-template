export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container flex items-center justify-between px-4 sm:px-6">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Web Template. All rights reserved.
        </p>
        <p className="text-muted-foreground text-sm">Built with Next.js 16</p>
      </div>
    </footer>
  )
}
