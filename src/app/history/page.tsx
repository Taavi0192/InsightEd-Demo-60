// import HistoryComponent from "@/components/HistoryComponent";
// import { getAuthSession } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import React from "react";
// import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
// import { LucideLayoutDashboard } from "lucide-react";
// import QuizDashboard from "../QuizDashboard/page";

// type Props = {};

// const History = async (props: Props) => {
//   const session = await getAuthSession();
//   if (!session?.user) {
//     return redirect("/");
//   }
//   return (
//     <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[400px]">
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-2xl font-bold">History</CardTitle>
//             <Link className={buttonVariants()} href="/QuizDashboard">
//               <LucideLayoutDashboard className="mr-2" />
//               Back to Dashboard
//             </Link>
//           </div>
//         </CardHeader>
//         <CardContent className="max-h-[60vh] overflow-scroll">
//           <HistoryComponent limit={100} userId={session.user.id} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };



import HistoryComponent from "@/components/HistoryComponent";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";

const History = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[400px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <Link className={buttonVariants()} href="/QuizDashboard">
              <LucideLayoutDashboard className="mr-2" />
              Back to Quizzes
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-scroll">
          <HistoryComponent limit={100} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
