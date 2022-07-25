import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState } = createGlobalState({
    articles: []
})

export { useGlobalState, setGlobalState }