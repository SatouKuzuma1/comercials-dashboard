import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Badge } from "~/components/ui/badge";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ManageBillingButton from "../stripe/manage-billing-button";

import { type SubscriptionDataType } from "~/types/subscription";
import { useMemo } from "react";
import { FormatDate } from "~/utils/main";

export function MainDashboard({
  subscriptionData,
  subscriptions,
}: SubscriptionDataType) {
  const formattedSubscriptions = useMemo(() => {
    return subscriptions.map((subscription) => ({
      ...subscription,
      created: subscription.created && FormatDate(subscription.created),
      currentPeriodEnd:
        subscription.currentPeriodEnd &&
        FormatDate(subscription.currentPeriodEnd),
      // ended_At: subscription.ended_at && FormatDate(subscription.ended_at),
    }));
  }, [subscriptions]);

  if (!formattedSubscriptions[0]) {
    return (
      <div className="bg-muted/40 mt-4 flex w-full flex-col">
        <div className=" flex flex-col text-2xl sm:gap-4 sm:py-4 sm:pl-14  ">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <Badge variant="outline" className="text-2xl">
                  No Subscriptions
                </Badge>
              </div>
            </Tabs>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted/40 mt-4 flex w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>

                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>

              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button> */}
              </div>
            </div>

            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardHeader>
                  <CardTitle>Subscriptions</CardTitle>
                  <CardDescription>Manage your subscriptions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {/* <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead> */}
                        <TableHead>Subscription</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Ends at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {formattedSubscriptions.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">Premium</TableCell>
                          <TableCell>
                            {result.status && (
                              <Badge variant="outline">{result.status}</Badge>
                            )}
                          </TableCell>
                          <TableCell>${result.price}</TableCell>

                          <TableCell className="hidden md:table-cell">
                            {result.created && result.created}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {result.currentPeriodEnd}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <ManageBillingButton />
                                {/* <DropdownMenuItem>Manage</DropdownMenuItem> */}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  {/* <div className="text-muted-foreground text-xs">
          Showing <strong>1-10</strong> of <strong>32</strong>{" "}
          products
        </div> */}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="active">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardHeader>
                  <CardTitle>Subscriptions</CardTitle>
                  <CardDescription>Manage your subscriptions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {/* <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead> */}
                        <TableHead>Subscription</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>

                        <TableHead className="hidden md:table-cell">
                          Ends at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formattedSubscriptions.map(
                        (result) =>
                          result.status === "active" && (
                            <>
                              <TableRow key={result.id}>
                                <TableCell className="font-medium">
                                  Premium
                                </TableCell>
                                <TableCell>
                                  {result.status && (
                                    <Badge variant="outline">
                                      {result.status}
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell>${result.price}</TableCell>

                                <TableCell className="hidden md:table-cell">
                                  {result.created && result.created}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {result.currentPeriodEnd}
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                          Toggle menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <ManageBillingButton />
                                      {/* <DropdownMenuItem>Manage</DropdownMenuItem> */}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            </>
                          ),
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  {/* <div className="text-muted-foreground text-xs">
                      Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                      products
                    </div> */}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
