export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Mandy AI!
        </h1>
        <p className="leading-normal text-muted-foreground">
        Hi, I’m Mandy, your personal AI assistant. I offer personalized treatment recommendations, and help you choose the best health coverage plan to cater your needs. Prioritize your health with the future of medicine with me!
        </p>
        { /*<p className="leading-normal text-muted-foreground">
          It uses{' '}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </ExternalLink>{' '}
          to combine text with generative UI as output of the LLM. The UI state
          is synced through the SDK so the model is aware of your interactions
          as they happen.
        </p>*/}
      </div>
    </div>
  )
}
