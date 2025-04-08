import { trpc } from '../../lib/trpc-config'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  console.log('Query state:', { data, error, isLoading, isFetching, isError })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data) {
    return <span>No data available</span>
  }

  return (
    <div>
      <h1>All Ideas</h1>
      {data.travelIdeas.map((idea) => (
        <div key={idea.id}>
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
