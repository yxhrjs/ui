import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI, initChat } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'

export const metadata = {
  title: 'Mandy AI'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()
  const response = await initChat(1);
  console.log('========================');
  console.log(response);
  console.log('========================');
  return (
    !response.isError && <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} conversationId={response.data.conversationId}/>
    </AI>
  )
}
