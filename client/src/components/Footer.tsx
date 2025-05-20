export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full border-t border-zinc-300/50 py-6 bg-white">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <p className="text-center text-sm text-gray-500 md:text-left">
          &copy; {new Date().getFullYear()} FeedbackHub. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}