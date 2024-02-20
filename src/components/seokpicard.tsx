/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/GIWFLkcX3Ht
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SEOKPICard({ searchvolume, clicks, impressions, position, ctr }) {

  return (
    <Card className="grid gap-4 p-4 md:grid-cols-2 lg:gap-8 lg:p-6">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-2xl font-bold tracking-tighter">Search Volume</CardTitle>
        <CardDescription>The average number of searches for this keyword per month</CardDescription>
        <div className="flex items-center gap-2 mt-auto">
          <ArrowUpIcon className="h-6 w-6 text-green-500" />
          <span className="text-4xl font-bold tracking-tighter">{searchvolume}</span>
          <ArrowUpIcon className="h-6 w-6 text-green-500" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <CardDescription>Impressions</CardDescription>
          <CardTitle>{impressions}</CardTitle>
        </div>
        <div className="flex items-center gap-4">
          <CardDescription>Clicks</CardDescription>
          <CardTitle>{clicks}</CardTitle>
        </div>
        <div className="flex items-center gap-4">
          <CardDescription>Click-Through Rate (CTR)</CardDescription>
          <CardTitle>{ctr}%</CardTitle>
        </div>
        <div className="flex items-center gap-4">
          <CardDescription>Position</CardDescription>
          <CardTitle>{position}</CardTitle>
        </div>
      </CardContent>
    </Card>
  )
}


function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    function ArrowDownIcon(props) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      )
    }
  )
}
