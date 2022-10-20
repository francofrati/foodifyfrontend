// import React, { useState, useEffect } from 'react'
// import { Prompt } from 'react-router-dom'

// const useUnsavedChangesWarning = ( message = "If you leave it now cart will be cleared" ) => {

//     const [isDirty, setDirty] = useState(false)

//     useEffect(() => {
//         window.onbeforeunload = isDirty && (() => message)

//         return () => {
//             window.onbeforeunload = null
//         }
//     }, [isDirty])

//     const routerPrompt = <Prompt when={isDirty} message={message} />

//     return [routerPrompt, () => setDirty(true), () => setDirty(false)]
// }

// export default useUnsavedChangesWarning