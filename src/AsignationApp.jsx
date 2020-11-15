import React from 'react'
import { Provider } from 'react-redux'
import { AppRoutes } from './router/AppRoutes'
import { store } from './store/store'

export const AsignationApp = () => {

    return (
        <Provider store={ store }>
           <AppRoutes />
        </Provider>
    )
}
