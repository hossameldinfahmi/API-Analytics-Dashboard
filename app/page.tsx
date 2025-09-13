import { DashboardHeader } from "@/components/dashboard-header"
import { SummaryCards } from "@/components/summary-cards"
import { MainContent } from "@/components/main-content"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <SummaryCards />
          <MainContent />
        </div>
      </main>
    </div>
  )
}
