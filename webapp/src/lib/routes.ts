const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllIdeasRoute = () => '/'

export const viewIdeaRouteParams = getRouteParams({ travelIdeas: true })
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams
export const getViewIdeaRoute = ({ travelIdeas }: ViewIdeaRouteParams) => `/ideas/${travelIdeas}`

export const destinationDetailsRouteParams = getRouteParams({ id: true })
export type DestinationDetailsRouteParams = typeof destinationDetailsRouteParams
export const getDestinationDetailsPageRoute = ({ id }: DestinationDetailsRouteParams) => `/ideas/details/${id}`