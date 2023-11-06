import { prisma } from "@/lib/prisma";
import { updateMeterings } from "@/lib/server-actions"
import { useTransition } from "react";

const [isPending, startTransition] = useTransition();
const intakePerPumpe = 48
const members = 12
function setMeteringValues(check, metering, lastMetering) {
  const intakePerMember = (check.intake - intakePerPumpe) / members
  const newMetering = metering.map((m) => {
    const value = lastMetering.value + intakePerMember * Math.random()
    m.value = value
    m.intake = value - lastMetering.value
  })
  
  startTransition(async () => {
    updateMeterings(newMetering)
  })
}

