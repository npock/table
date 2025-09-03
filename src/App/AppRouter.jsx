import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from '../Provider/userProvider.jsx'
import { QualitiesProvider } from '../Provider/QualitiesProvider.jsx'
import { AuthProvider } from '../Provider/AuthProvider.jsx'
import Table from '../Table.jsx'
import { UserLayouts } from '../layouts/UserLayouts.jsx'
import { ProfessionsProvider } from '../Provider/ProfessionProvider.jsx'

export const AppRouter = () => {
  return (
    <AuthProvider>
      <ProfessionsProvider>
        <QualitiesProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Table />} />
              <Route path="/users/:id?/:edit?" element={<UserLayouts />} />
            </Routes>
          </UserProvider>
        </QualitiesProvider>
      </ProfessionsProvider>
    </AuthProvider>
  )
}
