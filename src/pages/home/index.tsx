import { CyclesContext, type CreateCycleType } from '@/contexts/cycles-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Hand, Play } from 'lucide-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Countdown } from './components/countdown'
import { NewCycleForm } from './components/new-cycle-form'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

export const cycleSchema = z.object({
  task: z.string().min(1, 'Task is required'),
  minutes: z.coerce
    .number()
    .min(1, 'Minimum of 5 minutes')
    .max(60, 'Maximum of 60 minutes'),
})

export type CycleSchema = z.infer<typeof cycleSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptActiveCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<CycleSchema>({
    resolver: zodResolver(cycleSchema),
    defaultValues: { task: '', minutes: 0 },
  })

  const { handleSubmit, reset, watch } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: CreateCycleType) {
    createNewCycle(data)
    reset()
  }

  function handleInterruptActiveCycle() {
    interruptActiveCycle()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton
            type="button"
            onClick={handleInterruptActiveCycle}
          >
            <Hand />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
