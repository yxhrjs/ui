'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'

import { UserMessage, BotMessage } from './stocks/message'
import { AI } from '@/lib/chat/actions'
import { submitMessage } from '@/lib/chat/server'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'

export function PromptForm({
  input,
  setInput,
  conversationId
}: {
  input: string
  setInput: (value: string) => void
  conversationId: string
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [_, setMessages] = useUIState<typeof AI>()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, []) 

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        if (!value) return

        // Optimistically add user message UI
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>
          }
        ])

        const responseM = await submitMessage(
          value,
          conversationId
        )
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <BotMessage content={responseM.response} />
          }
        ])
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pr-8 sm:rounded-md sm:border sm:pr-12">
        { /* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
              onClick={() => {
                router.push('/new')
              }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>*/ }
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Ask your questions here..."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
