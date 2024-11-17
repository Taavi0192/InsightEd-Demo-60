import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { verifyActivity } from "@/lib/api/activities"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

const activityLogCreateSchema = z.object({
  date: z.string(),
  count: z.number(),
})

const routeContextSchema = z.object({
  params: z.object({
    activityId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)
    const { params } = routeContextSchema.parse(context)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!(await verifyActivity(params.activityId))) {
      return new Response(null, { status: 403 })
    }

    // Get all of logs for the activity
    const logs = await prisma.activityLog.findMany({
      select: {
        id: true,
        date: true,
        count: true,
      },
      where: {
        activityId: params.activityId,
      },
    })

    return new Response(JSON.stringify(logs))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)
    const { params } = routeContextSchema.parse(context)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (!(await verifyActivity(params.activityId))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = activityLogCreateSchema.parse(json)

    // Check if the log exists for the current date
    const existingLog = await prisma.activityLog.findFirst({
      where: {
        date: body.date,
        activityId: params.activityId,
      },
    })

    // If log already exists, update the count
    if (existingLog) {
      const updatedLog = await prisma.activityLog.update({
        where: { id: existingLog.id },
        data: {
          count: existingLog.count + body.count,
        },
        select: {
          id: true,
        },
      })

      return new Response(JSON.stringify(updatedLog))
    }

    // Create new log for the selected activity if no log exists
    const logs = await prisma.activityLog.create({
      data: {
        date: body.date,
        count: body.count,
        activityId: params.activityId,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(logs))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
