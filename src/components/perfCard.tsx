import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const upArrow = (
    <span className="items-center flex bg-green-400 justify-center rounded">
        <svg width="16" height="16" viewBox="0 0 24 24" focusable="false">
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z">
            </path>
        </svg>
    </span>
)
const downArrow = (
    <span className="items-center flex bg-red-400 text-red-500 justify-center rounded">
        <svg width="16" height="16" viewBox="0 0 24 24" focusable="false" className="text-red-500">
            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
        </svg>
    </span>

)

export default async function PerfCard({ title, pageStat }: { title: string, pageStat: any }) {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize"
                >
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-2">
                    {downArrow}
                    {upArrow}
                    <div className="VKMjFc">
                        <div className="pKBk1e">DAX</div>
                        <div className="wzUQBf">
                            <span className="lh92">
                                <div className="s1OkXb">
                                    <div className="YMlKec">17,679.47</div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                {/* <div className="text-2xl font-bold">{playerStatsCleaned[playerStatsCleaned.length - 1][playerStat].toFixed(0)}</div> */}
                {/* <p className="text-xs text-muted-foreground">
                {evolutionsPlayerStats[playerStat] > 0 ? "🔺" : "🔻"}
                {evolutionsPlayerStats[playerStat]}% from last war
            </p> */}
            </CardContent>
        </Card >

    );
};

