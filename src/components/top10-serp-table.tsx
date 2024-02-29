import { Table, TableCell } from "@/components/ui/table";

import {
    TableBody,
    TableCaption,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import Link from "next/link";

export default async function SERPComponent({ serpData }: { serpData: any[] }) {

    return (
        <div className="container mx-auto">
            <Table>
                <TableCaption>Top 10 SERP</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead>Url</TableHead>
                        <TableHead>SEO Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {serpData.map((serp) => (
                        <TableRow key={serp.position}>
                            <TableCell>{serp.position}</TableCell>
                            <TableCell>
                                <Link href={serp.url}>{serp.url}</Link>
                            </TableCell>
                            <TableCell className="text-right">{serp.seoScore}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Overall Score</TableCell>
                        <TableCell className="text-right">80</TableCell>

                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};


