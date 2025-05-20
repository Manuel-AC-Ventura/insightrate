import { Link } from "react-router-dom"
import { ArrowRight, MessageSquare, ThumbsUp, Users } from "lucide-react"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { FeatureCard } from "../components/FeatureCard"

export const Home = () => {
  return (
    <div className="flex h-dvh w-full flex-col bg-slate-200">
      <Header />

      <main className="flex-1">
        <section className="flex flex-col items-center justify-center w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-violet-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Colete e gerencie feedback de forma eficiente
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Crie portais de feedback, receba sugestões e priorize recursos com base nos votos dos usuários.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/register">
                    <Button className="flex items-center text-white bg-violet-500 hover:bg-violet-600" >
                      Começar agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="text-black border border-zinc-300/50 bg-transparent hover:bg-zinc-300/50" >Fazer login</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <div className="absolute inset-0 bg-violet-100 rounded-2xl transform rotate-3"></div>
                  <div className="absolute inset-0 bg-white border border-zinc-300/50 rounded-2xl shadow-lg p-8">
                    <div className="space-y-4">
                      <div className="h-6 w-24 bg-violet-100 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-violet-100 rounded-full flex items-center justify-center">
                          <ThumbsUp className="h-4 w-4 text-violet-500" />
                        </div>
                        <div className="h-4 w-16 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Recursos principais</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tudo o que você precisa para gerenciar feedback e melhorar seu produto
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-10 py-12 lg:grid-cols-3 lg:gap-12">
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8 text-violet-500" />}
                title="Portais de Feedback"
                description="Crie portais personalizados para coletar sugestões dos seus usuários."
              />
              <FeatureCard
                icon={<ThumbsUp className="h-8 w-8 text-violet-500" />}
                title="Sistema de Votação"
                description="Permita que os usuários votem nas sugestões para priorizar recursos."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-violet-500" />}
                title="Gerenciamento de Status"
                description="Acompanhe o progresso das sugestões com status personalizáveis."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}