import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../i18n'
import { useTranslation } from 'react-i18next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = t("appTitle");
  }, [t]);
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </>
  )
}

export default App